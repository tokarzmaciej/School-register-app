import { ADD_ACTION } from '../types/actions';

export const addIngredient = (payload) => ({ type: ADD_ACTION, ...payload })