import {
    STUDENTS_GET_SUCCESS, STUDENT_POST_SUCCESS,
    STUDENT_DELETE_SUCCESS, STUDENT_PATCH_SUCCESS
} from "../types/students";
import {
    SUBJECT_POST_SUCCESS, SUBJECT_DELETE_SUCCESS,
    SUBJECT_PATCH_SUCCESS
} from '../types/subjects';
import {
    MARK_POST_SUCCESS, MARK_DELETE_SUCCESS,
    MARK_PATCH_SUCCESS
} from '../types/marks';


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
                ...state
                    .filter(student => student["_id"] !== action.payload.deletedStudent["_id"]),
            ]
        case STUDENT_PATCH_SUCCESS:
            return [
                ...state
                    .map(student => student["_id"] === action.payload.updatedStudent["_id"]
                        ? action.payload.updatedStudent : student),
            ]
        case SUBJECT_POST_SUCCESS:
            return [
                ...state
                    .map(student => student["_id"] === action.payload.newSubject.idStudent ?
                        {
                            ...student,
                            subjects: [action.payload.newSubject, ...student.subjects]
                        } : student),
            ]
        case SUBJECT_DELETE_SUCCESS:
            return [
                ...state
                    .map(student => student["_id"] === action.payload.deletedSubject.idStudent ?
                        {
                            ...student,
                            subjects: student.subjects.filter(subject => subject["_id"] !== action.payload.deletedSubject["_id"])
                        } : student),
            ]
        case SUBJECT_PATCH_SUCCESS:
            return [
                ...state
                    .map(student => student["_id"] === action.payload.updateSubject.idStudent ?
                        {
                            ...student,
                            subjects: student.subjects
                                .map(subject => subject["_id"] === action.payload.updateSubject["_id"] ?
                                    action.payload.updateSubject : subject)
                        } : student),
            ]
        case MARK_POST_SUCCESS:
            return [
                ...state
                    .map(student => action.payload.idStudents.includes(student["_id"]) ?
                        {
                            ...student,
                            subjects: student.subjects
                                .map(subject => action.payload.idSubjects.includes(subject["_id"]) ?
                                    {
                                        ...subject,
                                        marks: [action.payload.newMark, ...subject.marks]
                                    } : subject)
                        } : student),
            ]

        case MARK_DELETE_SUCCESS:
            return [
                ...state
                    .map(student => action.payload.idStudent === student["_id"] ?
                        {
                            ...student,
                            subjects: student.subjects
                                .map(subject => action.payload.idSubject === subject["_id"] ?
                                    {
                                        ...subject,
                                        marks: subject.marks.filter(mark => mark["_id"] !== action.payload.idMark)
                                    } : subject)
                        } : student),
            ]
        case MARK_PATCH_SUCCESS:
            return [
                ...state.map(student => ({
                    ...student,
                    subjects: student.subjects.map(subject => ({
                        ...subject,
                        marks: subject.marks
                            .map(mark => mark["_id"] === action.payload.updatedMark["_id"] ?
                                action.payload.updatedMark : mark)
                    }))
                })),
            ]
        default:
            return state;
    }
};

export default students;