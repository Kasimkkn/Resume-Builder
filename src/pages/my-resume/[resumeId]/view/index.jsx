import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { serverName } from '@/constants/index.js';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '@/pages/dashboard/resume/components/ResumePreview';
import { RWebShare } from 'react-web-share';
import html2pdf from 'html2pdf.js';
import Header from '@/components/Header';

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    useEffect(() => {
        GetResumeInfo();
    }, [resumeId]);

    const GetResumeInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${serverName}/resumes/id=${resumeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setResumeInfo(response.data);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const HandleDownload = () => {
        const element = document.getElementById('print-area');
        const opt = {
            margin: 1,
            filename: `${resumeInfo?.firstName}_${resumeInfo?.lastName}_Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save();
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>
                        Congrats! Your Ultimate AI generates Resume is ready!
                    </h2>
                    <p className='text-center text-gray-400'>
                        Now you are ready to download your resume and you can share unique resume URL with your friends and family
                    </p>
                    <div className='flex justify-between px-44 my-10'>
                        <Button onClick={HandleDownload}>Download</Button>
                        <RWebShare
                            data={{
                                text: "Hello Everyone, This is my resume please open URL to see it",
                                url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
                                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button>Share</Button>
                        </RWebShare>
                    </div>
                </div>
            </div>
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <div id="print-area">
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;
