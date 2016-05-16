/* Reducers, analagous to Update in Elm */

import { combineReducers } from 'redux';

const initialState = {
    chunks: [
        { id: 0, text: 'any number' },
        { id: 1, text: 'another' }
    ]
};

function translatingList(state = initialState, action){
    return state;
}

export const rootReducer = combineReducers({
   translatingList 
});