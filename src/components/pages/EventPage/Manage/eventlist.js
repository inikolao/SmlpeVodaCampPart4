import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    deleteEvent,
    editEvent,
    fetchEvents,
    fetchEventsById,
    filterEventsByOwnerId
} from "../../../../reduxLib/eventsLib";
import {useNavigate} from "react-router-dom";

function Eventlist() {
    const [index, setIndex] = useState(0);
    const [eventlist,setEventList]=useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const events = useSelector((state) => state.eventsreducer.eventsListOwn);
    const state= useSelector((state) => state.eventsreducer.state);
    const id = useSelector((state)=> state.userreducer.id);

    useEffect(()=> {
        console.log('event profiles for user ',id);
        console.log('initial state ',events);
        if (!events || events.length === 0) {
            // Fetch the event by ID when the component mounts or when the id changes
            dispatch(filterEventsByOwnerId(id)).then((action) => {
                // Once the action is fulfilled, set the eventprofile state
                if (action.payload) {
                    setEventList(action.payload);
                    console.log("playload ", action.payload);
                    console.log("playload E", eventlist);
                }
            });
        } else {
            //let f=events.filter((event) => event.ownerid === id);
            // If the event data is already available, set the eventprofile state

            setEventList(events);
            console.log("not disp ",eventlist);
        }

    }, [dispatch,id,state,eventlist]);


    const handleSubmit = (event) => {
        dispatch(deleteEvent(event));
    };


    return (
        <div>
            <h1>Event List</h1>
            <p><button onClick={() => navigate(`/eventadd`)}>Add New event</button></p>
            <ul>
                {eventlist.map((event) => (
                    <li key={event.id}>
                        <div>
                            <h2><a href={`/eventprofile/${event.id}`}>{event.title}</a></h2>
                            <button onClick={() => navigate(`/edit/${event.id}`)}>Edit</button>
                            <button onClick={() =>{handleSubmit(event); window.location.reload();  }}>Delete</button>
                        </div>
                        <p>Description: {event.description}</p>
                        <p>Date and Time: {event.datetime}</p>
                        <p>Location: {event.location}</p>
                        <p>City: {event.city}</p>
                        <p>Owner ID: {event.ownerid}</p>
                        <p>Public: {event.public ? 'Yes' : 'No'}</p>
                        <div>
                            <h3>Files:</h3>
                            <ul>
                                {event.files.map((file, index) => (
                                    <li key={index}>
                                        File {index + 1}: {file.file1}, {file.file2}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Eventlist;