import React, {useEffect, useState} from 'react';
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {fetchUserByUsername} from "../reduxLib/userLib";

function Profile() {
    let {username} = useParams();
    console.log('name ',username);
    const [userprofile, setuserprofile] = useState();
    let dispatch = useDispatch();
    let user = useSelector((state)=> state.userreducer.user);
    let isLoggedIn = useSelector((state)=> state.userreducer.isLoggedIn);
    let navigate = useNavigate();

    useEffect(()=>{

        console.log('profile')
        if(!isLoggedIn) {
            alert('Please Login')
            navigate('/login')
        }
        if(user.id === 0)
            dispatch(fetchUserByUsername(username));
        else{
            console.log('else')
            console.log(user)
            setuserprofile(user)
        }
    },[user])
    return (
        <div className='container mt-4'>
            <div className='row'>
               <div className='col-md-4'>
                    {
                        //isUserLoggedIn()  ?
                        userprofile ?
                            <div>
                                <h1>User Profile</h1>
                                <p>Name : {userprofile.username}</p>
                                <p>Email : {userprofile.email}</p>
                            </div> : ''

                        // <Navigate to='/login'/>
                    }
                </div>
                <div className='col-md-8'>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default Profile;