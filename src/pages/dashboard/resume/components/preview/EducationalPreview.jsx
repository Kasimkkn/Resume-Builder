import React from 'react'

function EducationalPreview({resumeInfo}) {
  return (
    <div className='my-6'>
    <h2 className='text-center font-bold text-sm mb-2 uppercase'
    style={{
        color:resumeInfo?.themeColor
    }}
    >Education</h2>
    <hr style={{
        borderColor:resumeInfo?.themeColor
    }} />

    {resumeInfo?.education.map((education,index)=>(
        <div key={index} className='my-5'>
            <h2 className='text-sm font-bold capitalize'
                style={{
                    color:resumeInfo?.themeColor
                }}
            >{education.universityName}</h2>
            <h2 className='text-xs flex justify-between capitalize'>{education?.degree} in {education?.major}
            <span>{education?.startDate} To {education?.endDate}</span>
            </h2>
            <p className='text-xs my-2 capitalize'>
                {education?.description}
            </p>
        </div>
    ))}

    </div>
  )
}

export default EducationalPreview