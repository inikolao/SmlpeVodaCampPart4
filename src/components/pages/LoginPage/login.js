import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeRegisterStatus, loginUser} from "../../../reduxLib/userLib";

const initialState = {
    "username":"",
    "password":""
}


function LoginPage() {
    const [user, setuser] = useState(initialState);
    const [error, setError] = useState();

    let navigate = useNavigate();

    // dispatch us used to call the actions
    let dispatch = useDispatch();
    // is used to get the current state from the store
    let status = useSelector((state)=> state.userreducer.loginstatus);
    let registerstatus = useSelector((state)=> state.userreducer.registerstatus);
    console.log('register status ', registerstatus);

    useEffect(()=>{
        dispatch(changeRegisterStatus())
        if(status === 'success'){
            //console.log('1',status)
            navigate('/')
        }
        else if(status === 'failure'){
            //console.log('2',status)
            setError('Invalid Credentials')
        }

    },[status])
    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log('User :', user);
         dispatch(loginUser(user))
        //  console.log('submit')
    }

        return (
    <div className="container">
        <p style={{color:'red'}}>{error && error}</p>
        <h2>Login Page</h2>
        <form method="post" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" className="form-control" id="username" name="username"  onChange={(event)=>setuser({...user, [event.target.name]:event.target.value})} placeholder="Enter username"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" name="password" value={user.password}   onChange={(event)=>setuser({...user, [event.target.name]:event.target.value})}
                       placeholder="Enter password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>);
}

export default LoginPage;