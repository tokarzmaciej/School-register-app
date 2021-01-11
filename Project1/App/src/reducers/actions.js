import { ACTIONS_SUCCESS, ADD_ACTION } from "../types/actions";


const actions = (state = [], action) => {
    switch (action.type) {
        case ACTIONS_SUCCESS:
            return [
                ...action.payload.allActions
            ]
        case ADD_ACTION:
            return [
                ...state,
                action.payload
            ]
        default:
            return state;
    }
}

export default actions