import { Key } from "react";

export interface FormData {
    name: string;
    date_of_birth: Date;
    class: string;
    division: string;
    gender: string;
  }
export interface responseStudent{
    data: student[]
    status: Number
}
export interface Objectid {
    timestamp: Key
    date: Date
}
export interface student {
    id: Objectid,
    adminssionNumber: String
    name: String
    division: String
    student_class: String
    gender: String
    dateofbirth: String
}