import {FOLLOW_USER, GET_USER, UNFOLLOW_USER, UPDATE_BIO, UPDATE_PHOTO } from "../actions/userActions";


let myState = {
    user: {}
}

export default function userReducer(state = myState.user, action) {
    switch(action.type) {
        case GET_USER:
            return action.payload
            
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload
            }
        case UPDATE_PHOTO:
            return {
                ...state,
                photo: action.payload.photo
            }
        case FOLLOW_USER:
            return {
                ...state,
                following: [...state.following, action.payload.idToFollow]
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter(id => id !== action.payload.idToUnfollow),
            }
        default: 
            return state;
    }
}