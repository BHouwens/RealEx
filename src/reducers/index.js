/* Reducers, analagous to Update in Elm */

import { combineReducers } from 'redux';
import { regexList } from './regexList';

export const rootReducer = combineReducers({
   regexList 
});