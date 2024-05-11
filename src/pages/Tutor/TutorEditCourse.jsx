import React from 'react'
import EditCourse from '../../components/tutor/EditCourse'
import TutorLayout from '../../components/tutor/TutorLayout'

const TutorEditCourse = () => {
  return (
    <TutorLayout>
            <div className="form_container auth-container">
      <div className="form-container">
    {/* <div>TutorEditCourse</div> */}
    <EditCourse/>
    </div>
    </div>
    </TutorLayout>
  )
}

export default TutorEditCourse