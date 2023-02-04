import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Context } from '../../context/Context';
import { deltComment, getComments, getReplies, getUserDetails, updateComment } from '../../utils/api';
import EditModal from '../EditModal/EditModal';
import "./Comment.css";


const initialUser = {
    userName: "User",
    photo: 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'
}

const Comment = ({data,setEdit,edit,setEditContet,setEditType,setOnlyReply}) => {

    const { id, content, userId, likes, time, commentId, replyId } = data;
    const [commentUser, setUser] = useState(initialUser);
    
    const [replies, setReplies] = useState([])
    const {commentsHandler,user,setReplyType,setReplyTypeId,setEditId} = useContext(Context);
    const contentRef = useRef();

    useEffect(() => {
        getUserDetails(userId).then(res => setUser(res))
        .catch(err => console.log(err.message))

        if (!commentId && !replyId) {
            let query = new URLSearchParams({ commentId: id });
            getReplies(query).then(res => {
                
                if(res.length>0){
                    setReplies(res)
                }
            })
            .catch(err => console.log(err))
        }

        if(commentId){
            let query = new URLSearchParams({ replyId: id });
            getReplies(query).then(res => {
               
                if(res.length>0){
                    setReplies(res)
                }
            })
            .catch(err => console.log(err))
        }

    }, [])


    const increaseLike =(likes,id)=>{
        const updateBody={
            likes:likes
        }
        if(!commentId&&!replyId){
            updateComment('comments',updateBody,id).then(()=>{
                getComments().then(res=>{
                    commentsHandler(res);
                })
                .catch(err=>console.log(err.message))
            })
        }
        else{
            updateComment('replies',updateBody,id).then(()=>{
                getComments().then(res=>{
                    commentsHandler(res);
                })
                .catch(err=>console.log(err.message))
            })
        }
    }


    const deleteComment =(id)=>{
        
        if(!commentId&&!replyId){
            deltComment('comments',id).then(()=>{
                getComments().then(res=>{
                    commentsHandler(res);
                })
                .catch(err=>console.log(err.message))
            })
        }
        else{
            deltComment('replies',id).then(()=>{
                getComments().then(res=>{
                    commentsHandler(res);
                })
                .catch(err=>console.log(err.message))
            })
        }
    }

    const editHandler=()=>{
        setEditContet(content);
        setEditId(id);
        setOnlyReply(false);

        if(!commentId&&!replyId){
            setEditType('comments');
        }
        else{
            setEditType('replies');
        }
        setEdit(true)
    }

    const replyHandler = () =>{
        setEditContet("");
        setEditId(id);
        setOnlyReply(true)
        if(!commentId&&!replyId){
            setReplyType('commentId');
            setReplyTypeId(id)
        }
        if(commentId){
            setReplyType('replyId');
            setReplyTypeId(id)
        }
        setEdit(true)
    }

    

    return (
        <div className='singleCommentContainer'  >
            <div className='commentContainer'>
                <img className='commentUserImage' width='50px' height='50px' src={commentUser.photo?commentUser.photo:'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'} />
                <div className='commentBody'>
                    <div className='commentBodyHead'>
                        <p className='commentName'>{commentUser.userName}</p>
                        <p className='commentTime'>{time} hour ago</p>
                    </div>
                    <p  spellCheck={false}  ref={contentRef} className='commentContent'>{content}</p>
                    <div className='commentFooter'>
                        <p className='commentLikes'>{likes}</p>
                        <i onClick={()=>increaseLike(likes+1,id)} className="fa-solid fa-caret-up"></i>
                        <i onClick={()=>increaseLike(likes-1,id)} className="fa-solid fa-caret-down"></i>
                        {userId===user.id?<i onClick={()=>deleteComment(id)} className="fa-solid fa-square-minus"></i>:""}
                        {userId===user.id?<i onClick={()=>{
                           editHandler();
                        }}className="fa-solid fa-pen-to-square"></i>:""}
                        <p onClick={replyHandler}>Reply</p>
                        <p>Share</p>
                    </div>
                </div>
            </div>
            <div className='replyContainer'>
                {
                    replies.map((ele,idx) => {
                        return <Comment setOnlyReply={setOnlyReply} setEditContet={setEditContet} setEditType={setEditType}  edit={edit} setEdit={setEdit} key={`replies+${Math.random()+idx}`} data={ele} />
                    })
                }
            </div>
        </div>
    )

}

export default Comment