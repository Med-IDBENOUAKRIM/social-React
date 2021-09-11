import { GET_TRENDS } from "../actions/postActions"

let myState = []


export default function trendResucer (state = myState, action) {
    switch(action.type) {

        case GET_TRENDS:
            return action.payload;
        default:
            return state;
    }
}