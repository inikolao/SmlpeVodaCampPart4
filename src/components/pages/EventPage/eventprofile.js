import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import eventsreducer, {fetchEvents, fetchEventsById, fetchEventsByPublic} from "../../../reduxLib/eventsLib";

function Eventprofile() {

    let {id} = useParams();
    const[eventprofile,seteventprofile]=useState();
    const dispatch = useDispatch();
    const events = useSelector((state) => state.eventsreducer.selectedEvent);
    const state= useSelector((state) => state.eventsreducer.state);



    useEffect(()=>{
        if (!events || events.id !== id) {
            // Fetch the event by ID when the component mounts or when the id changes
            dispatch(fetchEventsById(id)).then((action) => {
                // Once the action is fulfilled, set the eventprofile state
                if (action.payload) {
                    seteventprofile(action.payload);
                    console.log(action.payload);
                }
            });
        } else {
            // If the event data is already available, set the eventprofile state
            seteventprofile(events);
            console.log(events);
        }
    }, [dispatch,id,state])

    return (
        <div>
            <div className='row-cols-md-1'>
                 {
                        //isUserLoggedIn()  ? ////eventprofile["file"]["file1"]
                     eventprofile ?
                            <div id="slide" className="card text-center">
                                <h1>Event Profile</h1>
                                <p>Name : {eventprofile.title}</p>
                                <p>Description : {eventprofile.description}</p>
                                {eventprofile.files[0].file1 && <img src={require(`../../rawFiles/${eventprofile.files[0].file1}.jpg`)} height="600"/>}
                                <p>Date : {eventprofile.datetime}</p>
                                <p>Location : {eventprofile.location}</p>
                                <p>debug : {eventprofile.location}</p>
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