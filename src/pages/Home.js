import React, { useContext, useEffect, useMemo, useState, memo, useCallback } from 'react'
import Comment from '../components/Comment/Comment'
import EditModal from '../components/EditModal/EditModal'
import Input from '../components/Input/Input'
import JoinDiscussion from '../components/JoinDiscussion/JoinDiscussion'
import { Context } from '../context/Context'
import { getComments } from '../utils/api'
import "./Home.css"

const Home = () => {

    const { comments, user, commentsHandler, setEdit, edit, setEditContet, setEditType, setEditId, setOnlyReply, setReplyTypeId, setReplyType } = useContext(Context);

    

    useEffect(() => {
        getComments().then(res => commentsHandler(res));
    }, [])

    
    const sortByDates = (e) => {
        const tempComment = [...comments];
        const sortBy = e.target.value;
        tempComment.sort((a, b) => {
            if (sortBy == 'nto') {
                return a.time - b.time
            } else {
                return b.time - a.time;
            }
        })
        commentsHandler(tempComment);
    }
    const sortByLikes = (e) => {
        const tempComment = [...comments];
        const sortBy = e.target.value;
        tempComment.sort((a, b) => {
            if (sortBy == 'lth') {
                return a.likes - b.likes
            } else {
                return b.likes - a.likes;
            }
        })
        commentsHandler(tempComment);
    }

    return (

        <div id='commentMainContainer'>
            {!user ? <Input /> :
                <div id='discussionContainer'>
                    <JoinDiscussion />
                    <div className='selectTagContainer'>
                        <select className='selectTag' onChange={sortByDates}>
                            <option value='nto'>Newest To Oldest</option>
                            <option value='otn'>Oldest To Newest</option>
                        </select>
                        <select className='selectTag' onChange={sortByLikes}>
                            <option value='htl'>High To Low</option>
                            <option value='lth'>Low To High</option>
                        </select>
                    </div>
                    <div >
                        {
                            comments.map((ele, idx) => {
                                return <Comment setOnlyReply={setOnlyReply} setEditContet={setEditContet} setEditType={setEditType}  edit={edit} setEdit={setEdit} key={`comments+${Math.random() + idx}`} data={ele} />
                            })
                        }
                    </div>
                </div>}
            {edit ? <EditModal /> : ""}
        </div>

    )
}

export default Home