import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { URL__API } from '../../config';
import FollowHandler from '../FollowHandler/FollowHandler';
import './FriendSoug.css'

function FriendSoug() {
    const [isLoading, setIsLoading] = useState(true);
    const [friends, setFriends] = useState([]);
    const userData = useSelector(state => state.userReducer)
    const users = useSelector(state => state.usersReducer);

    

    useEffect(() => {
        const notFriendList = () => {
            let friendsArr = [];
            users.map(user => {
                if(user._id !== userData._id && !user.followers.includes(userData._id)) 
                    return friendsArr.push(user._id);
            })
            friendsArr.sort(() => 0.5 - Math.random());
            setFriends(friendsArr);
        }
        console.log(friends);

        if(users && userData._id) {
            console.log(users)
            notFriendList();
            setIsLoading(false);
        }
    }, [userData, users])

    return (
        <div className='friends' >
            <h4>Suggestions</h4>
            {isLoading ? (
                <div className="loading" >
                    <i className="fas fa-spinner fa-spin"></i>
                </div>
            ) : (
                <ul>
                    {friends[0] && friends.map(friend => {
                        for (let i = 0; i < users.length; i++) {
                            if(friend === users[i]._id) {
                                return (
                                    <li key={friend} className="friends__list" >
                                        <img src={`${URL__API}/user/photo/${users[i]._id}`} alt='pic' />
                                        <p>{users[i].username}</p>
                                        <FollowHandler idToFollow={users[i]._id} type={'card'} /> 
                                    </li>
                                )
                            }
                            
                        }
                    })}
                </ul>
            )}
        </div>
    )
}

export default FriendSoug
