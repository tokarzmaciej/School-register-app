import { RSAA } from 'redux-api-middleware';
import {
    ACTIONS_GET_FAILURE, ACTIONS_GET_REQUEST, ACTIONS_GET_SUCCESS,
    ACTIONS_POST_FAILURE, ACTIONS_POST_REQUEST, ACTIONS_POST_SUCCESS
} from "../types/actions";


export const getActions = () => ({
    [RSAA]: {
        endpoint: 'http://localhost:5000/actions',
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            ACTIONS_GET_REQUEST,
            ACTIONS_GET_SUCCESS,
            ACTIONS_GET_FAILURE]
    }
});

export const postAction = (payload) => ({
    [RSAA]: {
        endpoint: 'http://localhost:5000/actions',
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            ACTIONS_POST_REQUEST,
            ACTIONS_POST_SUCCESS,
            ACTIONS_POST_FAILURE]
    }
});