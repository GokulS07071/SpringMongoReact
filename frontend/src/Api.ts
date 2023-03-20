import axios from 'redaxios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
import { FormData } from './model/student'
import { student } from './model/student'
export const FetchAllStudents = async () => {
    const { data, status } = await axios.get<student[]>(
        `http://127.0.0.1:3001/api/v1/getAllStudent`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
    return {data,status}
}
    

export const addStudent = async (params: FormData) => {
    const { data, status } = await axios.post<student>(
        `${BACKEND_URL}/student/`,
        params,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
    return {data,status}
}