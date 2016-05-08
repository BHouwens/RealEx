/* Reducers, analagous to Update in Elm */

import { combineReducers } from 'redux';

function regexReducer(){
    return {
            chunks: [
                { id: 0, text: 'test' },
                { id: 1, text: 'another' }
            ]
        };
}

export default combineReducers({
   chunks: regexReducer 
});