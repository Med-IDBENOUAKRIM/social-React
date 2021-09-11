import React, { useEffect, useState } from 'react';
import './Trend.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTrends } from '../../actions/postActions';
import { URL__API } from '../../config';
import { NavLink } from 'react-router-dom';

function Trend() {
    const posts = useSelector(state => state.postReducer);
    const userData = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();
    const sortArrPost = useSelector(state => state.trendReducer)

    useEffect(() => {
        if(posts) {
            const postsArr = Object.keys(posts).map(i => posts[i]);
            let sortedArr = postsArr.sort((a, b) => {
                return b.likers.length - a.likers.length
            })
            sortedArr.length = 3;
            dispatch(getTrends(sortedArr));
        }
    },[posts, dispatch])

    return (
        <div className="trend" >
        <div >
            <h3>Trending</h3>
            <NavLink to="/trending" >
            {sortArrPost.map(post => (
                <li key={post._id} >
                    <div className="trend__container" >
                        {post.photo && <img src={`${URL__API}/user/photo/${post.ownerId}`} alt="logo" />}
                        {post.video && (
                            <iframe 
                            width="100" 
                            height="100" 
                            src={post.video} 
                            title={post._id} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen></iframe>
                        )}
                        {(!post.photo && !post.video) && (
                            <img src={`${URL__API}/user/photo/${post.ownerId}`} alt="logo" />
                        )}
                        <div className="more">
                            <p>{post.content}</p>
                            <span>Read</span>
                        </div>
                    </div>
                </li>
            ))}
        </NavLink>
        </div>
        </div>
    )
}

export default Trend
