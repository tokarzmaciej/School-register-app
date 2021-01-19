import { STUDENTS_GET_SUCCESS, STUDENT_POST_SUCCESS, STUDENT_DELETE_SUCCESS } from "../types/students";
import { SUBJECT_POST_SUCCESS } from '../types/subjects'


const students = (state = [], action) => {
    switch (action.type) {
        case STUDENTS_GET_SUCCESS:
            return [
                ...action.payload.allStudents.reverse()
            ]
        case STUDENT_POST_SUCCESS:
            return [
                action.payload.addNewStudent,
                ...state,
            ]
        case STUDENT_DELETE_SUCCESS:
            return [
                ...state.filter(student => student["_id"] !== action.payload.deletedStudent["_id"]),
            ]
        case SUBJECT_POST_SUCCESS:
            return [
                ...state.map(student => student["_id"] === action.payload.newSubject.idStudent ?
                    {
                        ...student,
                        subjects: [action.payload.newSubject, ...student.subjects]
                    } : student),
            ]
        default:
            return state;
    }
}

export default students