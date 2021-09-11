import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../../actions/postActions';
import { checkLogin } from '../../helpers/check';
import "./Edit.css"

function EditDeleteComment({ comment, postId }) {
    const [isOwner, setIsOwner] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const user = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const { token } = checkLogin()

    const handleEdit = e => {
        e.preventDefault();
        if(text) {
            dispatch(editComment(text, comment._id, postId, token))
            setText('');
            setEdit(false);
        }
    }

    const handleDelete = () => {
        const ok = window.confirm('Are you sure to delete your comment?');
        if(ok) {
            dispatch(deleteComment(postId, comment._id, token))
        }
    }

    useEffect(() => {
        if(user._id === comment.commenterId) {
            setIsOwner(true);
        }
    },[user._id, comment.commenterId])

    return (
        <div className='edit__comment' >
            {isOwner && edit === false && (
                <>
                <span onClick={() => setEdit(!edit)} >
                    <i className="fas fa-edit fa__edit"></i>
                </span>
                <span onClick={handleDelete} >
                    <i class="fas fa-trash fa__delete"></i>
                </span>
               </> 
            )}
            {isOwner && edit && (
                <form onSubmit={handleEdit} className='edit__comment__form'>
                    <div className="input__comment">
                        <input 
                            type="text" 
                            defaultValue={comment.text}
                            onChange={e => setText(e.target.value)}
                        />
                        <span onClick={() => setEdit(!edit)} >&#10005;</span>
                    </div>
                    <button type="submit">update</button>
                </form>
            )}
        </div>
    )
}

export default EditDeleteComment
