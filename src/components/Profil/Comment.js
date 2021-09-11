import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import './Comment.css'
import FollowHandler from '../FollowHandler/FollowHandler';
import { createComment } from '../../actions/postActions';
import { checkLogin } from '../../helpers/check';
import { getPosts } from '../../actions/postActions';
import EditDeleteComment from '../UtilComponents/EditDeleteComment';
import { URL__API } from '../../config';

function Comment({ post, showComment }) {
    const [text, setText] = useState('');
    
    const user  = useSelector(state => state.userReducer);
    const users  = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();
    const { token } = checkLogin()

    const handleComment = (e) => {
        e.preventDefault();
        if(text) {
            dispatch(createComment(post._id, text, user._id, token))
                .then(() => dispatch(getPosts()))
                .then(() => setText(''));
        }
    }

    return (
        <div className="comment__card" >
            {
                showComment && (post.comments.map(comment => (
                    <div className={comment.commenterId === user._id ? "comment__card__container owner" : "comment__card__container"} >
                        <div className="comment__card__left" key={comment._id}>
                                <img src={`${URL__API}/user/photo/${comment.commenterId}`} alt="logo" />
                        </div>
                        <div className="comment__card__right">
                            <div className="comment__card__header">
                                <div className="name">
                                    <h3>{comment.owner}</h3>
                                    {comment.commenterId !== user._id && (
                                            <FollowHandler 
                                            idToFollow={comment.commenterId} 
                                            type={'card'}
                                        />
                                        )}
                                </div>
                                <span>{moment(comment.timestamp).fromNow()}</span>
                            </div>
                            <p>{comment.text}</p>
                            <EditDeleteComment comment={comment} postId={post._id} />
                        </div>
                    </div>
                ))
            )}
            {user._id && (
                <form onSubmit={handleComment} className="form" >
                    <input 
                        className="input"
                        type="text" 
                        name="text"
                        onChange={e => setText(e.target.value)}
                        value={text}
                        placeholder="Leave a comment"
                    />
                    <button type="submit" >comment</button>
                </form>
            )}
        </div>
    )
}

export default Comment