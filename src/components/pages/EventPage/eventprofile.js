import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchEvents, fetchEventsById, fetchEventsByPublic} from "../../../reduxLib/eventsLib";

function Eventprofile() {

    let {id} = useParams();
    let ifd={id}.id;
    const[eventprofile,seteventprofile]=useState();
    let dispatch = useDispatch();
    let eventRecieved = useSelector((state)=> state.eventsreducer.eventR);
    //let navigate = useNavigate();

    useEffect(()=>{

        console.log('profile and id : '+ {id}.id);
        //let id={id}.id;
         let ls=dispatch(fetchEventsById(ifd));
         console.log("kk ",ls);
        console.log("kk2 ",eventRecieved);
         seteventprofile(eventRecieved);
        console.log("event p  ",eventprofile)

    }, [eventprofile])

    return (
        <div>
            <div className='col-md-4'>
                 {
                        //isUserLoggedIn()  ?
                        eventprofile ?
                            <div>
                                <h1>Event Profile</h1>
                                <p>Name : {eventprofile.title}</p>
                                <p>Description : {eventprofile.description}</p>
                                <p>Date : {eventprofile.datetime}</p>
                                <p>Location : {eventprofile.location}</p>
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

export default Eventprofile;