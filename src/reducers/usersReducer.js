import { GET_USERS } from "../actions/usersAction";

let myState = {
    users: []
}

export default function usersReducer(state = myState.users, action) {
    switch(action.type) {
        case GET_USERS:
            return action.payload
        
        default: 
            return state;
    }
}