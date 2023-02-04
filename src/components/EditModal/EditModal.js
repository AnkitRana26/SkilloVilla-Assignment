import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context';
import { getComments, postReplies, updateComment } from '../../utils/api';
import './EditModal.css'

const EditModal = () => {
    const [content, setContent] = useState("");
    const {commentsHandler,user,setEdit,editContent,editType,editID,onlyReply,replyType,replyTypeId,setOnlyReply} = useContext(Context);
    useEffect(() => {
        if(!onlyReply){
            setContent(editContent);
        }
        
    }, [onlyReply])

    const changeHandler = (e) => {
        setContent(e.target.value);
    }

    const clickhandler = () => {
        let updateBody;
        
        
        if(!onlyReply){

            updateBody= {
                content: content
            }
            updateComment(editType, updateBody, editID).then(() => {
                getComments().then(res => {
                    commentsHandler(res);
                })
                .catch(err => console.log(err.message))
            })
        }
        else{
            updateBody={
                content:content,
                time:0,
                likes:0,
                userId:user.id,
                [replyType]:replyTypeId
            }
            console.log(updateBody);
            postReplies(updateBody).then(() => {
                getComments().then(res => {
                    commentsHandler(res);
                })
                .catch(err => console.log(err.message))
            })

        }


        setEdit(false);

    }


    return (
        <div id='editContainer'>
            <div id='textContainer'>
                <textarea onChange={changeHandler} value={content}></textarea>
                <button onClick={clickhandler} >Submit</button>
                <button onClick={() => {
                    setEdit(false)
                    setOnlyReply(false);
                }}>Close</button>
            </div>
        </div>
    )
}

export default EditModal