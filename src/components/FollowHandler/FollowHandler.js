import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from '../../actions/userActions';
import { checkLogin } from '../../helpers/check';
import './FollowHandle.css'

function FollowHandler({ idToFollow, type }) {
    const userData = useSelector(state => state.userReducer)
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();
    const {token} = checkLogin()

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow, token));
        setIsFollowed(true);
    }
    const handleUnFollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow, token))
        setIsFollowed(false);
    }

    useEffect(() => {
        if(userData.following){
            if(userData.following.includes(idToFollow)) {
                setIsFollowed(true)
            }else {
                setIsFollowed(false)
            }
        }
    },[userData, idToFollow])

    return (
        <div>
            {isFollowed ? (
                <span onClick={handleUnFollow} className="unfollow__handle" >
                    {type === "suggestion" && <button className="unfollow__btn" >unfollow</button>}
                    {type === "card" && <i className="fas fa-user-check icon__add__plus"></i> }
                </span>
            ):(
                <span onClick={handleFollow} className="follow__handle" >
                    {type === "suggestion" && <button className="follow__btn" >follow</button>}
                    {type === "card" && <i className="fas fa-user-plus icon__add"></i> }
                </span>
            )}
        </div>
    )
}

export default FollowHandler
