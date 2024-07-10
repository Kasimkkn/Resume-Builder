import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume.jsx";
import ResumeCardItem from "./components/ResumeCardItem.jsx";
import axios from "axios";
import { serverName } from "@/constants/index.js";
import { useAuth } from "@/context/AuthContext.jsx";

function Dashboard() {
  const [resumeList, setResumeList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  const GetResumesList = async () => {
    try {
      const token = localStorage.getItem('token');
      // get all resumes
      const response = await axios.get(`${serverName}/resumes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setResumeList(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>
      <div
        className="grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-5 gap-5
      mt-10
      "
      >
        <AddResume refreshData={GetResumesList} />
        {resumeList.length > 0
          ? resumeList.map((resume, index) => (
              <ResumeCardItem
                resume={resume}
                key={index}
                refreshData={GetResumesList}
              />
            ))
          : [1,2].map((item, index) => (
              <div
                key={index}
                className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
