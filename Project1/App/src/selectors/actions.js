import { createSelector } from 'reselect';

const getActionsSelector = state => state.actions;

export const last15Actions = createSelector(
    getActionsSelector,
    actions => actions.slice(-15).reverse()
);