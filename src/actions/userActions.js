import { URL__API } from "../config";

export const GET_USER = "GET_USER";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_PHOTO = "UPDATE_PHOTO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const getUser = (id, token) => {
    return (dispatch) => {
        return fetch(`${URL__API}/user/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": token
            },
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res
            })
        })
        .catch(error => console.log(error))
    }
}


export const updateBio = (userId, bio, token) => {
    return (dispatch) => {
        return fetch(`${URL__API}/user/bio/${userId}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({bio})
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: UPDATE_BIO,
                payload: bio
            })
        })
        .catch(error => console.log(error))
    }
}


export const editPhoto = (userId, data, token) => {
    return (dispatch) => {
        return fetch(`${URL__API}/user/photo/v1/${userId}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "authorization": token
            },
            body: data
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            dispatch({
                type: UPDATE_PHOTO,
                payload: data
            })
        })
        .catch(error => console.log(error))
    }
}

export const followUser = (followId, idToFollow, token) => {
    return dispatch => {
        return fetch(`${URL__API}/user/follow/${followId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({idToFollow})
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: FOLLOW_USER,
                payload: {idToFollow}
            })
        })
        .catch(error => console.log(error))
    }
}

export const unfollowUser = (followId, idToUnfollow, token) => {
    
    return (dispatch) => {
        return fetch(`${URL__API}/user/unfollow/${followId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({idToUnfollow})
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: UNFOLLOW_USER,
                payload: {idToUnfollow}
            })
        })
        .catch(error => console.log(error))
    }
}