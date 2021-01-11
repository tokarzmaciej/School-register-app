import { createSelector } from 'reselect';



const getActionsSelector = state => state.actions

export const last20Actions = createSelector(
    getActionsSelector,
    actions => actions.slice(-10)
)

