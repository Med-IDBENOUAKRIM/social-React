import { URL__API } from "../config";

export const GET_POSTS = "GET_POSTS";
export const GET_TRENDS = "GET_TRENDS";
export const ADD_POSTS = "ADD_POSTS";
export const DELETE_POSTS = "DELETE_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getPosts = () => {
    return dispatch => {
        return fetch(`${URL__API}/post`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res
            })
            
        })
        .catch(err => console.log(err))
    }
}

export const addPost = (data, token) => {
    console.log("add "+ data)
    return dispatch => {
        return fetch(`${URL__API}/post/new`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "authorization": token
            },
            body: data
        })
        .then(res => {
            console.log(res)
            res.json()
        })
        
    }
}

export const deletePost = (postId, token) => {
    return dispatch => {
        return fetch(`${URL__API}/post/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: DELETE_POSTS,
                payload: { postId}
            })
        })
        .catch(error => console.log(error))
    }
}

export const likePost = (postId, userId, token) => {
    return dispatch => {
        return fetch(`${URL__API}/post/like/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({userId})
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: LIKE_POST,
                payload: { postId, userId }
            })
        })
        .catch(error => console.log(error))
    }
}

export const unLikePost = (postId, userIdUnlike, token) => {
    return dispatch => {
        return fetch(`${URL__API}/post/unlike/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({userIdUnlike})
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: UNLIKE_POST,
                payload: { postId, userIdUnlike }
            })
        })
        .catch(error => console.log(error))
    }
}

export const createComment = (postId, text, commenterId, token) => {
    return dispatch => {
        return fetch(`${URL__API}/comment/new/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({text, commenterId})
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: ADD_COMMENT,
                payload: { postId }
            })
        })
        .catch(err => console.log(err))
    }
}

export const editComment = (text, commentId, postId, token) => {
    return dispatch => {
        return fetch(`${URL__API}/comment/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({text, commentId})
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: EDIT_COMMENT,
                payload: { postId, commentId, text }
            })
        })
        .catch(err => console.log(err))
    }
}

export const deleteComment = (postId, commentId, token) => {
    return dispatch => {
        return fetch(`${URL__API}/comment/${postId}/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: DELETE_COMMENT,
                payload: {postId, commentId}
            })
        })
    }
}

export const getTrends = (sortedArray) => {
    return dispatch => {
        dispatch({
            type: GET_TRENDS,
            payload: sortedArray
        })
    }
}