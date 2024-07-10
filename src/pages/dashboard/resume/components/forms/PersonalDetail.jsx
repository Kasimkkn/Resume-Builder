import React, { useContext, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { serverName } from '@/constants/index.js';

function PersonalDetail({ enabledNext }) {
  const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState(resumeInfo || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    enabledNext(Object.keys(formData).length > 0);
  }, [formData, enabledNext]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setResumeInfo({ ...resumeInfo, [name]: value });
    enabledNext(true);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${serverName}/resumes/id=${resumeId}`, formData);
      toast.success('Resume updated successfully');
    } catch (error) {
      toast.error('Error updating resume');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p>Get Started with the basic information</p>
      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label className='text-sm'>First Name</label>
            <Input
              name="firstName"
              defaultValue={formData.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='text-sm'>Last Name</label>
            <Input
              name="lastName"
              required
              defaultValue={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Job Title</label>
            <Input
              name="jobTitle"
              required
              defaultValue={formData.jobTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Address</label>
            <Input
              name="address"
              required
              defaultValue={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='text-sm'>Phone</label>
            <Input
              name="phone"
              required
              defaultValue={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='text-sm'>Email</label>
            <Input
              name="email"
              required
              defaultValue={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
