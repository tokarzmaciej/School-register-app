import { RSAA } from 'redux-api-middleware';
import {
    STUDENTS_GET_FAILURE, STUDENTS_GET_REQUEST, STUDENTS_GET_SUCCESS,
    STUDENT_POST_FAILURE, STUDENT_POST_SUCCESS, STUDENT_POST_REQUEST,
    STUDENT_DELETE_FAILURE, STUDENT_DELETE_SUCCESS, STUDENT_DELETE_REQUEST,
    STUDENT_PATCH_FAILURE, STUDENT_PATCH_SUCCESS, STUDENT_PATCH_REQUEST

} from "../types/students";

export const getStudents = () => ({
    [RSAA]: {
        endpoint: 'http://localhost:5000/students',
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            STUDENTS_GET_REQUEST,
            STUDENTS_GET_SUCCESS,
            STUDENTS_GET_FAILURE]
    }
});


export const postStudent = (payload) => ({
    [RSAA]: {
        endpoint: 'http://localhost:5000/students',
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            STUDENT_POST_REQUEST,
            STUDENT_POST_SUCCESS,
            STUDENT_POST_FAILURE]
    }
});

export const deleteStudent = (payload) => ({
    [RSAA]: {
        endpoint: `http://localhost:5000/students/${payload}`,
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            STUDENT_DELETE_REQUEST,
            STUDENT_DELETE_SUCCESS,
            STUDENT_DELETE_FAILURE]
    }
});

export const patchStudent = (payload, idStudent) => ({
    [RSAA]: {
        endpoint: `http://localhost:5000/students/${idStudent}`,
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            STUDENT_PATCH_REQUEST,
            STUDENT_PATCH_SUCCESS,
            STUDENT_PATCH_FAILURE]
    }
});