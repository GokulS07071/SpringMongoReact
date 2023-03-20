import React from 'react'
import { student } from '../model/student'
const StudentCard = ({Student}:{Student:student}) => {
  return (
    <div className="block max-w-sm p-6 bg-gray-500 border border-gray-200 rounded-lg shadow hover:bg-gray-400 ">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{Student.name}</h5>
        <p className="font-normal text-white">Date of birth: {Student.dateofbirth}</p>
        <p className="font-normal text-white">Class: {Student.student_class}</p>
        <p className="font-normal text-white">Division: {Student.division}</p>
        <p className="font-normal text-white">Gender: {Student.gender}</p>
    </div>
  )
}

export default StudentCard