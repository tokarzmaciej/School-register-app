import { createAction } from 'redux-api-middleware';
import { ACTIONS_FAILURE, ACTIONS_REQUEST, ACTIONS_SUCCESS } from "../types/actions";
import axios from 'axios';

export const getActions = () => (dispatch) => dispatch(createAction({
    endpoint: 'http://localhost:5000/actions',
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        ACTIONS_REQUEST,
        ACTIONS_SUCCESS,
        ACTIONS_FAILURE]
}));

export const postAction = (payload) => async dispatch => {
    try {
        await axios.post('http://localhost:5000/actions', payload)
    }
    catch (e) {
        dispatch({
            type: "ACTIONS_ERROR",
            payload: console.log(e),
        })
    }
}