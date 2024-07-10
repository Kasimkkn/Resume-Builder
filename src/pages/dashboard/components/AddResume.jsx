import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useAuth } from "@/context/AuthContext.jsx";
import { serverName } from "@/constants/index.js";
import { useNavigate } from 'react-router-dom';

function AddResume({ refreshData }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigation = useNavigate();

    const onCreate = async () => {
        setLoading(true);
        const uuid = uuidv4();
        const data = {
            title: resumeTitle,
            resumeId: uuid,
            userEmail: user.email,
            userName: user.name
        };
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${serverName}/resumes`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            refreshData();
            navigation('/dashboard/resume/' + response.data._id + "/edit");
        } catch (error) {
            console.error('Error creating resume:', error);
        } finally {
            setLoading(false);
            setOpenDialog(false);
        }
    };

    return (
        <div>
            <div className='p-14 py-24 border 
            items-center flex 
            justify-center bg-secondary
            rounded-lg h-[280px]
            hover:scale-105 transition-all hover:shadow-md
            cursor-pointer border-dashed'
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare />
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            Add a title for your new resume
                            <Input className="my-2"
                                placeholder="Ex. Full Stack resume"
                                onChange={(e) => setResumeTitle(e.target.value)}
                            />
                        </DialogDescription>
                        <div className='flex justify-end gap-5'>
                            <Button onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
                            <Button
                                disabled={!resumeTitle || loading}
                                onClick={onCreate}
                            >
                                {loading ?
                                    <Loader2 className='animate-spin' /> : 'Create'
                                }
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddResume;
