import { RSAA } from 'redux-api-middleware';
import {
    MARK_POST_REQUEST, MARK_POST_SUCCESS, MARK_POST_FAILURE,
    MARK_DELETE_REQUEST, MARK_DELETE_SUCCESS, MARK_DELETE_FAILURE,
    MARK_PATCH_REQUEST, MARK_PATCH_SUCCESS, MARK_PATCH_FAILURE

} from "../types/marks";


export const postMark = (payload) => ({
    [RSAA]: {
        endpoint: `http://localhost:5000/students/createMark`,
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            MARK_POST_REQUEST,
            {
                type: MARK_POST_SUCCESS,
                payload: async (action, state, res) => {
                    return res.json().then(json => ({
                        newMark: json.newMark,
                        idSubjects: payload.idSubjects,
                        idStudents: payload.idStudents
                    }))
                }

            },
            MARK_POST_FAILURE]
    }
});


export const deleteMark = (idStudent, idSubject, idMark) => ({
    [RSAA]: {
        endpoint: `http://localhost:5000/students/subjects/${idSubject}/marks/${idMark}`,
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            MARK_DELETE_REQUEST,
            {
                type: MARK_DELETE_SUCCESS,
                payload: async (action, state, res) => {
                    return res.json().then(json => ({
                        idMark: idMark,
                        idSubject: idSubject,
                        idStudent: idStudent
                    }))
                }

            },
            MARK_DELETE_FAILURE]
    }
});

export const patchMark = (payload, idMark) => ({
    [RSAA]: {
        endpoint: `http://localhost:5000/students/marks/${idMark}`,
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            MARK_PATCH_REQUEST,
            MARK_PATCH_SUCCESS,
            MARK_PATCH_FAILURE]
    }
});