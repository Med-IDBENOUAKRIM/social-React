import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/postActions';
import { URL__API } from '../../config';
import { checkLogin } from '../../helpers/check';
import './NewPost.css';

function NewPost() {
    const [formData, setFormaData] = useState(new FormData());
    const [isLoading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState(null);
    const [defaultPhoto, setDefaultPhoto] = useState(null);
    const [video, setVideo] = useState("");
    const user = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const { token } = checkLogin()

    const handleChange = e => {
        setDefaultPhoto(URL.createObjectURL(e.target.files[0]))
        setPhoto(e.target.files[0])
    }

    const handlePost = async () => {
        if(content || video || photo) {
            
            formData.set('content', content);
            formData.set('video', video);
            if(photo) formData.set('photo', photo);

            await dispatch(addPost(formData, token));
            dispatch(getPosts());
            cancelPost();
        }
    }


    const cancelPost = () => {
        setContent("");
        setPhoto(null);
        setDefaultPhoto(null);
        setVideo("");
    }

    const handleVideo = () => {
        let link = content.split(" ");
        for (let i = 0; i < link.length; i++) {
            if(link[i].includes('https://www.yout') || link[i].includes('https://yout') ){
                let embed = link[i].replace('watch?v=', "embed/");
                setVideo(embed.split("&")[0]);
                link.splice(i, 1);
                setContent(link.join(" "));
                setPhoto("");
            }
            
        }
    }

    useEffect(() => {
        if(user) {
            setLoading(false)
        }
        handleVideo();
    },[user, content, video])

    return (
        <div className={(photo && video) ? "new__post" : "post__new"} >
            {isLoading ? (
                <i className="fas fa-spin fa-spinner"></i>
            ) : (
                <>
                    <div className="new__post__info">
                        <span>{user.following && user.following.length} following</span>
                            <div className="new__post__path" >
                                <NavLink exact to="/profil" >
                                    <img src={`${URL__API}/user/photo/${user._id}`} alt="logo" />
                                </NavLink>
                                <textarea 
                                    type="text" 
                                    value={content} 
                                    placeholder="Post something"
                                    onChange={e => {
                                        setContent(e.target.value)
                                    }}
                                     />
                                     {content || photo || video?(
                                         <div className="new__input" >
                                             <p>{content}</p>
                                             {photo && <img src={defaultPhoto} alt="pic" />}
                                             {video && (
                                                <iframe 
                                                    width="500" 
                                                    height="300" 
                                                    src={video} 
                                                    frameBorder="0" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                    allowfullscreen
                                                    title={video} 
                                                ></iframe>
                                            )}
                                         </div>
                                     )
                                        :
                                     null
                                     }
                                
                                {!video && (
                                    <label>
                                        <i class="far fa-image fa-file"></i>
                                        <input 
                                            type="file" 
                                            id="photo" 
                                            hidden 
                                            onChange={handleChange}
                                        />
                                    </label>
                                )}
                                
                                <div className="new__pos__btn" >
                                    {(content || photo || video) && (
                                        <>
                                            <button onClick={cancelPost} className="cancel" >Cancel post</button>
                                            <button onClick={handlePost} className="post" >post</button>
                                        </>
                                        )}
                                </div>
                            </div>
                        <span>{user.followers && user.followers.length} followers</span>
                    </div>
                </> 
            )}
        </div>
    )
}

export default NewPost
