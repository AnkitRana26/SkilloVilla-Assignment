import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context';
import { loggedInUser } from '../../utils/api';
import './Input.css'

const initialForm = {
    userName: '',
    photo: ""
}

const Input = () => {
    const [form, setForm] = useState(initialForm);
    const {user,userHandler} = useContext(Context);
    const submitHandler = (e) => {
        e.preventDefault();
        loggedInUser(form).then(res=>{
            
            userHandler(res);
        })
        .catch(err=>console.log(err.message))
    }


    const changeHandler =(e)=>{

        const {name,value} = e.target;
        setForm({...form,[name]:value});

    }


    return (
        <div id='userContainer'>
            <h2 id='userHeading'>Enter User Details</h2>
            <form onSubmit={submitHandler} id='userForm'>

                <input type='text' onChange={changeHandler}  name='userName' value={form.userName}required placeholder='Enter UserName *' />
                <input type='text' onChange={changeHandler} name='photo' value={form.photo} placeholder='Enter Image Url (Optional)' />
                <button type='submit' id='submitFormButton' >Submit</button>
            </form>
        </div>

    )
}

export default Input