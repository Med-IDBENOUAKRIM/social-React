import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import './Card.css'
import FollowHandler from '../FollowHandler/FollowHandler';
import LikeButton from '../Profil/LikeButton';
import Comment from '../Profil/Comment';
import { URL__API } from '../../config';
import { deletePost } from '../../actions/postActions';
import { checkLogin } from '../../helpers/check';

function Card({ post }) {
    const [isLoading, setIsLoading] = useState(true);
    const [showComment, setShowComment] = useState(false);
    const userData = useSelector(state => state.userReducer);
    const users = useSelector(state => state.usersReducer);
    const { token } = checkLogin();
    const dispatch = useDispatch();

    const handleDelet = () => {
        dispatch(deletePost(post._id, token))
    }

    useEffect(() => {
        if(users.length > 0)
         setIsLoading(false)
    },[users])

    
    return (
        <li className="card" >
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card__left" >
                        <img src={`${URL__API}/user/photo/${post.ownerId}`} alt="logo" />
                    </div>
                    <div className="card__right" >
                        <div className="card__header">
                            <div className="card__name">
                                <h3>
                                    {
                                        users && users.map(user => {
                                            if(user._id === post.ownerId) return user.username
                                            else return null
                                        })
                                    }
                                </h3>
                                {post.ownerId !== userData._id && (
                                    <FollowHandler idToFollow={post.ownerId} type={"card"}   />
                                    )}

                            
                            </div>
                            <span className="moment" >
                                {moment(post.createdAt).fromNow()}
                                {post.ownerId === userData._id && <i class="fas fa-trash delete" onClick={handleDelet} ></i>}
                            </span>
                            
                        </div>
                        <div className="content">
                            <p>{post.content}</p>
                            
                            {post.photo && <img src={`${URL__API}/post/v1/photo/${post._id}`} alt="card" />}
                            {post.video && (
                                <iframe 
                                    width="560" 
                                    height="300" 
                                    src={post.video} 
                                    title={post._id} 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen></iframe>
                            )}

                            <div className="footer">
                                <div className="like">
                                    <LikeButton post={post} />
                                    <span>{post.likers.length}</span>
                                </div>
                                <hr />
                                <div className="comment">
                                    <i onClick={() => setShowComment(!showComment)} className="fas fa-comment"></i>
                                    <span>{post.comments.length}</span>
                                </div>
                                
                            </div>
                        </div>
                        
                        <Comment post={post} showComment={showComment} />
                    </div>
                </>
            )}
        </li>
    )
}

export default Card
