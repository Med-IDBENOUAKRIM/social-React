import React, { Fragment, useEffect, useState } from 'react'
import { checkLogin } from '../../helpers/check';
import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css"
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unLikePost } from '../../actions/postActions'

function LikeButton({ post }) {
    const user  = useSelector(state => state.userReducer);
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();
    const {token} = checkLogin()

    const like = () => {
        dispatch(likePost(post._id, user._id, token))
        setLiked(true)
    }

    const unlike = () => {
        dispatch(unLikePost(post._id, user._id, token))
        setLiked(false)
    }

    useEffect(() => {
        if(user) {
            if(post.likers.includes(user._id)) {
                setLiked(true)
            }else{
                setLiked(false)
            }
        }else{
            setLiked(false)
        }
    },[liked, user, post.likers])

    

    return (
        <Fragment>
            <div className="like__container">
                {checkLogin() === false && (
                    <Popup
                        trigger={ <i className="far fa-thumbs-up fa-2x"></i> }
                        position={["bottom center", "bottom right", "bottom left"]}
                        closeOnDocumentClick>
                    <div>Login to like a post</div>
                    </Popup>
                )}
                {checkLogin() && liked === false &&(
                    <i className="far fa-thumbs-up" onClick={like} ></i> 
                )}
                {checkLogin() && liked &&(
                    <i className="fas fa-thumbs-up" onClick={unlike} ></i> 
                )}
            </div>
        </Fragment>
    )
}

export default LikeButton
