import { RSAA } from 'redux-api-middleware';
import {
    SUBJECT_POST_REQUEST, SUBJECT_POST_SUCCESS, SUBJECT_POST_FAILURE

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

