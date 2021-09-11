import { URL__API } from "../config";

export const GET_USERS = "GET_USERS";


export const getUsers = () => {
    return (dispatch) => {
        fetch(`${URL__API}/user`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res
            })
        })
        .catch(error => console.log(error))
    }
}