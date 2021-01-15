import { STUDENTS_GET_SUCCESS, STUDENT_POST_SUCCESS, STUDENT_DELETE_SUCCESS } from "../types/students";


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
        default:
            return state;
    }
}

export default students