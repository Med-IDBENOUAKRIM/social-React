import { DELETE_COMMENT, DELETE_POSTS, EDIT_COMMENT, GET_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/postActions";

let myState = []

export default function userReducer(state = myState, action) {
    switch(action.type) {
        case GET_POSTS:
            return action.payload
        case LIKE_POST:
            return state.map(post => {
                if(post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: [action.payload.userId, ...post.likers]
                    }
                }
                return post;
            })
        case DELETE_POSTS: 
            return state.filter(post => post._id !== action.payload.postId);
        case UNLIKE_POST:
            return state.map(post => {
                if(post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: post.likers.filter(id => id !== action.payload.userIdUnlike)
                    }
                }else{
                    return post;
                }
            })

        case EDIT_COMMENT: 
            return state.map((post) => {
                if(post._id === action.payload.postId) {
                    return {
                        ...post,
                        comments: post.comments.map(comment => {
                            if(comment._id === action.payload.commentId) {
                                return {
                                    ...comment,
                                    text: action.payload.text
                                }
                            }else {
                                return comment;
                            }
                        })
                    }
                }else {
                    return post;
                }
            })
        case DELETE_COMMENT:
            return state.map((post) => {
                if(post._id === action.payload.postId) {
                    return {
                        ...post,
                        comments: post.comments.filter(comment => comment._id !== action.payload.commentId)
                    }
                } else {
                    return post;
                }
            })
        default: 
            return state;
    }
}