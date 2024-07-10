import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Add axios import
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from '../../../../../service/AIModal.js';
import toast from 'react-hot-toast';

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of Summary for 3 experience level, Mid Level and Fresher level in 3-4 lines in array format, With Summary and experience_level Field in JSON Format";

function Summary({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState(resumeInfo?.summary || '');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState([]);

    useEffect(() => {
        if (summary !== undefined && summary !== resumeInfo.summary) {
            setResumeInfo(prevResumeInfo => ({
                ...prevResumeInfo,
                summary: summary
            }));
        }
    }, [summary, setResumeInfo, resumeInfo.summary]);

    const GenerateSummaryFromAI = async () => {
         toast.error('Ai Server Is Down');
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle || '');
        try {
            const result = await AIChatSession.sendMessage(PROMPT);
            const parsedResult = JSON.parse(result.response.text());
            setAiGenerateSummaryList(parsedResult);
        } catch (error) {
            console.error('Error generating summary from AI:', error);
            toast.error('Failed to generate summary from AI');
        } finally {
            setLoading(false);
        }
    };

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`http://localhost:5000/api/resumes/id=${params.resumeId}`, { summary });
            toast.success('Resume updated successfully');
        } catch (error) {
            console.error('Error updating resume:', error);
            toast.error('Error updating resume');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add Summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button variant="outline" onClick={GenerateSummaryFromAI} type="button" size="sm" className="border-primary text-primary flex gap-2">
                            <Brain className='h-4 w-4' /> Generate from AI
                        </Button>
                    </div>
                    <Textarea className="mt-5" required value={summary} onChange={(e) => setSummary(e.target.value)} />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummaryList && (
                <div className='my-5'>
                    {
                        aiGeneratedSummaryList.length > 0 ? <h2 className='font-bold text-lg'>Summary Generated from AI</h2> : null
                    }
                    {aiGeneratedSummaryList.map((item, index) => (
                        <div key={index} onClick={() => setSummary(item?.summary)} className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                            <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                            <p>{item?.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summary;
