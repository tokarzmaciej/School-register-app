import { RSAA } from 'redux-api-middleware';
import {
    SUBJECT_POST_REQUEST, SUBJECT_POST_SUCCESS, SUBJECT_POST_FAILURE,
    SUBJECT_DELETE_REQUEST, SUBJECT_DELETE_SUCCESS, SUBJECT_DELETE_FAILURE,
    SUBJECT_PATCH_REQUEST, SUBJECT_PATCH_SUCCESS, SUBJECT_PATCH_FAILURE

} from "../types/subjects";


export const postSubject = (payload, idStudent) => ({
    [RSAA]: {
        endpoint: `http://localhost:5000/students/${idStudent}/subjects`,
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            SUBJECT_POST_REQUEST,
            SUBJECT_POST_SUCCESS,
            SUBJECT_POST_FAILURE]
    }
});

export const deleteSubject = (idStudent, idSubject) => ({
    [RSAA]: {
        endpoint: `http://localhost:5000/students/${idStudent}/subjects/${idSubject}`,
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            SUBJECT_DELETE_REQUEST,
            SUBJECT_DELETE_SUCCESS,
            SUBJECT_DELETE_FAILURE]
    }
});

export const patchSubject = (payload, idStudent, idSubject) => ({
    [RSAA]: {
        endpoint: `http://localhost:5000/students/${idStudent}/subjects/${idSubject}`,
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            SUBJECT_PATCH_REQUEST,
            SUBJECT_PATCH_SUCCESS,
            SUBJECT_PATCH_FAILURE]
    }
});