import React, { useState } from "react";

export const Context = React.createContext();


export const ContextProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [edit, setEdit] = useState(false);
    const [editContent, setEditContet] = useState("");
    const [editType, setEditType] = useState();
    const [editID, setEditId] = useState();
    const [onlyReply, setOnlyReply] = useState(false);
    const [replyType,setReplyType] = useState(false);
    const [replyTypeId,setReplyTypeId] = useState();

    const commentsHandler = (newComments) => {
        setComments((prev) => newComments);
    }

    const userHandler = (newUser) => {
        setUser(newUser);
    }

    const passValue = {
        comments,
        commentsHandler,
        user,
        userHandler,
        edit,
        setEdit,
        editContent,
        setEditContet,
        editType,
        setEditType,
        editID,
        setEditId,
        onlyReply,
        setOnlyReply,
        replyType,
        setReplyType,
        replyTypeId,
        setReplyTypeId

    }

    return <Context.Provider value={passValue}>
        {children}
    </Context.Provider>


}

