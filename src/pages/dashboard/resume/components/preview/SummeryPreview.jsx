import React from 'react'

function SummeryPreview({resumeInfo}) {
  return (
    <p className='text-xs capitalize'>
        {resumeInfo?.summary}
    </p>
  )
}

export default SummeryPreview