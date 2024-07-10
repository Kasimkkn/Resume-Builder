import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { LoaderCircle } from 'lucide-react'
import axios from 'axios'
import { serverName } from '@/constants/index.js'

function Experience() {
    const [experienceList, setExperienceList] = useState([{
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        currentlyWorking: false,
        endDate: '',
        workSummary: '',
    }]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo && resumeInfo.experience) {
            setExperienceList(resumeInfo.experience);
        }
    }, []);

    const handleChange = useCallback((index, event) => {
        const newEntries = [...experienceList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    }, [experienceList]);

    const AddNewExperience = useCallback(() => {
        setExperienceList([...experienceList, {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            currentlyWorking: false,
            endDate: '',
            workSummary: '',
        }]);
    }, [experienceList]);

    const RemoveExperience = useCallback(() => {
        setExperienceList(experienceList => experienceList.slice(0, -1));
    }, []);

    const handleRichTextEditor = useCallback((event,value, index) => {
        let newEntries = [...experienceList];
        console.log(newEntries)
        newEntries[index].workSummary = event.target.value;
        setExperienceList(newEntries);
    }, [experienceList]);

    useEffect(() => {
        if (resumeInfo) {
            setResumeInfo(prev => ({
                ...prev,
                experience: experienceList
            }));
        }
    }, [experienceList]);

    const onSave = async (e) => {
        setLoading(true);
        try {
            const res =await axios.put(`${serverName}/resumes/id=${params.resumeId}`, { experience:experienceList });
            toast.success('Resume updated successfully');
        } catch (error) {
            console.error('Error updating resume:', error);
            toast.error('Error updating resume');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your previous Job experience</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input name="title"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.title}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input name="companyName"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.companyName} />
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input name="city"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.city} />
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input name="state"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.state}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input type="date"
                                        name="startDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.startDate} />
                                </div>
                                {resumeInfo.currentlyWorking? <div>
                                    <label className='text-xs'>Present</label>
                                    <Input type="checkbox" name="currentlyWorking"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.currentlyWorking}
                                    />
                                </div> : <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input type="date" name="endDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.endDate}
                                    />
                                </div> }
                                
                                <div className='col-span-2'>
                                    {/* Work Summery  */}
                                    <RichTextEditor
                                        index={index}
                                        defaultValue={item?.workSummary}
                                        onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummary', index)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
                        <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>

                    </div>
                    <Button disabled={loading} onClick={() => onSave()}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Experience