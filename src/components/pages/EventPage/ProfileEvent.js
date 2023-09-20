import React, {useEffect, useState} from 'react';
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {fetchEventsById} from "../../../reduxLib/eventsLib";

function ProfileEvent(props) {

    let {eventr} = useParams()
    console.log('name ',eventr)
    const[eventprofile,seteventprofile]=useState();
    let dispatch = useDispatch()
    let eventt = useSelector((state)=> state.eventslice.reducer)
    let navigate = useNavigate()

    useEffect(()=>{

        console.log('profile')
        if(eventr.id === 0)
            dispatch(fetchEventsById(eventr.id))
        else{
            console.log('else')
            console.log(eventr)
            seteventprofile(eventr)
        }
    },[user])

    return (
        <div>
             <div className='col-md-4'>
                    {
                        //isUserLoggedIn()  ?
                        eventprofile ?
                            <div>
                                <h1>Event Profile</h1>
                                <p>Name : {eventprofile.title}</p>
                                <p>Email : {eventprofile.email}</p>
                                <p>Role : {eventprofile.role}</p>
                            </div> : ''

                        // <Navigate to='/login'/>
                    }
                </div>
                <div className='col-md-8'>
                    <Outlet/>
                </div>
        </div>
    );
}

export default ProfileEvent;