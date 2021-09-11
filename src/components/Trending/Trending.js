import React from 'react';
import { useSelector } from 'react-redux';
import { checkLogin } from '../../helpers/check';
import Card from '../Card/Card'
import FriendSoug from '../Profil/FriendSoug';
import './Trending.css'

function Trending() {
    const { user } = checkLogin();
    const trendList = useSelector(state => state.trendReducer);
    return (
        <div className='trending' >
            <div className='trending__container' >
                {trendList && trendList.map((post) => (
                    <Card post={post} key={post._id} />
                ))}
            </div>
            <div className="trend" >
                <div >
                    <FriendSoug />
                </div>
            </div>
        </div>
    )
}

export default Trending
