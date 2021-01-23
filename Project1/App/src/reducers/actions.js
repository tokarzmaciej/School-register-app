import { ACTIONS_GET_SUCCESS, ACTIONS_POST_SUCCESS } from "../types/actions";


const actions = (state = [], action) => {
    switch (action.type) {
        case ACTIONS_GET_SUCCESS:
            return [
                ...action.payload.allActions
            ]
        case ACTIONS_POST_SUCCESS:
            return [
                ...state,
                action.payload.newAction
            ]
        default:
            return state;
    }
};

export default actions;