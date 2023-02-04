import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import { getComments, postComment } from '../../utils/api';
import "./JoinDiscussion.css"
const JoinDiscussion = () => {
    const {user,commentsHandler} = useContext(Context);
    const submitHandler=(e)=>{
        const key = e.key;
        if(key=='Enter'){
            const body={
                content:e.target.value,
                time:0,
                userId:user.id,
                likes:0
                
            }
            postComment(body).then(res=>{
                getComments().then(res=>{
                    commentsHandler(res);
                    e.target.value="";
                })
                .catch(err=>console.log(err.message))
            })
        }

    }

    return (
        <div id='joinDiscussionContainer'>
            <img width='50px' height='50px' src={user.photo?user.photo:'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'} />
            <textarea onKeyUp={submitHandler} placeholder='Join Discussion' maxLength='200' spellCheck='false'></textarea>
        </div>
    )
}

export default JoinDiscussion