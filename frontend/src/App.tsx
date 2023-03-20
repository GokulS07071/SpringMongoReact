import { useState, useEffect } from 'react'
import './App.css'
import moment from 'moment'
import { FormData, student, responseStudent } from './model/student'
import {RadioGroup, Radio} from 'react-radio-group'
import { addStudent, FetchAllStudents } from './Api'
import StudentCard from './components/StudentCard'

function convertDate(dateString: String){
  var p = dateString.split(/\D/g)
  return [p[2],p[1],p[0] ].join("-")
  }

function App() {
  function validateNameField(input: string): boolean {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(input);
  }
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget
    const formElements = form.elements as typeof form.elements & FormData
    if(validateNameField(formElements.name.value)){
      const jsonObject: FormData = {
        name: formElements.name.value,
        date_of_birth: formElements.date_of_birth.value,
        class: formElements.class.value,
        division: formElements.division.value,
        gender: formElements.gender.value,
      }
      setNameError("")
      console.log(jsonObject.date_of_birth)
      addStudent(jsonObject)
    }else{
      setNameError("Name should be only letters and space")
    }
  
  }
  const classes = ['I', 'II', 'III', 'IV', 'V', 'V1', 'V11', 'V111', '1X', 'X', 'X11', 'X12']
  const [nameError, setNameError] = useState<string>("");
  const [students, setStudents] = useState<student[]>([]);
  const [selectRadio, setSelectRadio] = useState<string>('M');
  useEffect(()=>{
    (async () => {
      const Data: responseStudent = await FetchAllStudents();
      setStudents(Data.data);
    })();
  },[nameError])
  return (
    <div className="App">
      <div className='flex flex-row justify-between'>
      <form onSubmit={handleSubmit} className="w-1/2"> 
           <div className='flex flex-col items-start'>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
            <input type="text"
             name="name"
             id="first_name" 
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
            <p className='text-red-500'>{nameError}</p>
          </div>
          <div className='mt-5 flex flex-col items-start'>
            <label htmlFor="date_of_birth" className="block mb-2 text-sm font-medium text-gray-900 ">Date of Birth</label>
            <input type="date"
             name="date_of_birth"
             defaultValue={moment().format("YYYY-MM-DD")}
             max={moment().format("YYYY-MM-DD")}
             id="date_of_birth" 
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
          </div>
          <div className='mt-5 flex flex-col items-start'>
            <label htmlFor="classes" className="block mb-2 text-sm font-medium text-gray-900 ">Class</label>
            <select id="classes" name="class" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              {classes.map((item, index)=> <option key={index} value={item}>{item}</option>)}
            </select>
          </div>
          <div className='mt-5 flex flex-col items-start'>
            <label htmlFor="division" className="block mb-2 text-sm font-medium text-gray-900 ">Division</label>
            <select id="division" name="division" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            </select>
          </div>
          <div className='flex flex-row mt-5'>
            <p className='mr-10'>Gender:</p>
            <RadioGroup name="gender" className="" selectedValue={selectRadio} onChange={(val)=>setSelectRadio(val)}>
              <Radio value="M" className='mr-1'/>Male
              <Radio value="F" className='ml-5 mr-1'/>Female
            </RadioGroup>
          </div>
          
           <button type="submit" className="mt-10 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
             Submit
           </button>
         </form>
      <div>
        {
          students.map((student_element: student) => <StudentCard key={student_element.id.timestamp} Student={student_element} />)
        }
      </div>
      </div>
    </div>
  )
}

export default App
