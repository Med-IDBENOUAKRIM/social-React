import { combineReducers } from 'redux';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import postReducer from './postReducer';
import trendReducer from './trendReducer';

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    trendReducer,
})