import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts } from '../../actions/postActions';
import { checkLogin } from '../../helpers/check';
import Card from '../Card/Card';
import NewPost from '../Post/NewPost';
import FriendSoug from '../Profil/FriendSoug';
import Trend from '../Trends/Trend';
import './Home.css'

function Home({history}) {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const posts = useSelector(state => state.postReducer)
    

    useEffect(() => {
        if(isLoading) {
            dispatch(getPosts())
            setIsLoading(false);
        }
    },[isLoading ,dispatch, history])
    
    return (
        <div className="home" >
            <div className="home__container" >
                <ul className="home__thread" >
                    <Trend />
                </ul>
                <ul className="home__post" >
                    {checkLogin() && <NewPost />}
                    {posts && posts.map((post , i) => {
                        return <Card post={post} key={i} />
                    })}
                </ul>
                <ul className="home__sugg" >
                    {checkLogin() && <FriendSoug />}
                </ul>
            </div>
        </div>
    )
}

export default withRouter(Home)
