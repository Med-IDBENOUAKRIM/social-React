import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPhoto, getUser, updateBio } from '../../actions/userActions';
import { URL__API } from '../../config';
import { checkLogin } from '../../helpers/check';
import FollowHandler from '../FollowHandler/FollowHandler';
import './Profil.css'

function Profil() {
    const [bioValue, setBioValue] = useState("");
    const [userData, setUserData] = useState("");
    const [show, setShow] = useState(false);
    const [showFoolowersPopup, setShowFoolowersPopup] = useState(false);
    const [showFoolowingPopup, setShowFoolowingPopup] = useState(false);
    const { username, followers, following, bio } = useSelector(state => state.userReducer)
    const users = useSelector(state => state.usersReducer)
    const dispatch = useDispatch();
    const {user, token} = checkLogin()

    const handleChange = e => {
        setBioValue(e.target.value);
    }

    const handleUpdate = e => {
        e.preventDefault();
        dispatch(updateBio(user._id, bioValue, token));
        setShow(false);
        setBioValue("")
    }

    const handleChangePhoto = e => {
        const valeur = e.target.files[0];
        let userFormData = new FormData();
        userFormData.set('photo' ,valeur)
        setUserData(userFormData);
    }
    console.log(userData)

    const handlePhoto = () => {
        dispatch(editPhoto(user._id, userData, token))
        dispatch(getUser(user._id, token));
        setUserData('');
    }
    
    return (
        <div className="profile"  >
            <div className="profile__container">
                <h1>{username}'s profile </h1>
                <div className="profil__info">
                    <div className="logo">
                        <img src={`${URL__API}/user/photo/${user._id}`} alt={username} />
                        <label>
                            Update photo
                            <input type="file" hidden accept='image/*' onChange={handleChangePhoto} />
                        </label>
                        <button type="submit" onClick={handlePhoto} >Send</button>
                    </div>
                    <div className='follow__info bio' >
                        <div className="follow" >
                            <h3 onClick={() => setShowFoolowersPopup(true)} >{followers ? followers.length : ""} followers</h3>
                            <h3 onClick={() => setShowFoolowingPopup(true)}>{following ? following.length : ""} following</h3>
                        </div>
                        <form onSubmit={handleUpdate} className="form" >
                            <label htmlFor="bio">Bio</label>
                            {!show && (
                                <Fragment>
                                    <p className="text__bio" >{bio}</p>
                                    <h3 className="btn" onClick={() => setShow(true)} >Update bio</h3>
                                </Fragment>
                            )}
                            {
                                show && <Fragment>
                                    <textarea name="bio" cols="15" rows="5" onChange={handleChange} defaultValue={bio} ></textarea>
                                    <button type='submit' className="btn" >Modify bio</button>
                                </Fragment> 
                            }    
                        </form>
                    </div>
                </div>

            {showFoolowersPopup && (
                <div className="popup">
                <div className="modal">
                    <h3>followers</h3>
                        <span onClick={() => setShowFoolowersPopup(false)} >&#10005;</span>
                        <ul>
                            {users && users.map(user => {
                                for (let i = 0; i < followers.length; i++) {
                                    if(user._id === followers[i]){
                                        return (
                                            <li key={i} className="follows" >
                                                <img src={`${URL__API}/user/photo/${user._id}`} alt="card" />
                                                <h4>{user.username}</h4>
                                                <FollowHandler idToFollow={user._id} type={"suggestion"} />
                                            </li>
                                        )
                                    }
                                    
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                </div>)
            }
            {showFoolowingPopup && (
                <div className="popup">
                <div className="modal">
                    <h3>following</h3>
                    <span onClick={() => setShowFoolowingPopup(false)} >&#10005;</span>
                        <ul>
                            {users && users.map(user => {
                                for (let i = 0; i < following.length; i++) {
                                    if(user._id === following[i]){
                                        return (
                                            <li key={i} className="follows" >
                                                <img src={`${URL__API}/user/photo/${user._id}`} alt="card" />
                                                <h4>{user.username}</h4>
                                                <FollowHandler idToFollow={user._id} type={"suggestion"}  />
                                            </li>
                                        )
                                    }
                                    
                                }
                            })}
                        </ul>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default Profil
