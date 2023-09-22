import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchEvents, fetchEventsById} from "../../../../reduxLib/eventsLib";

function Eventlist() {
    const [index, setIndex] = useState(0);
    const[eventlist,setEventList]=useState();
    const dispatch = useDispatch();
    const events = useSelector((state) => state.eventsreducer.eventsList);
    const state= useSelector((state) => state.eventsreducer.state);
    const id = useSelector((state)=> state.userreducer.id);

    useEffect(()=> {
        console.log('event profiles for user ',id);
        if (!events || events.length === 0) {
            // Fetch the event by ID when the component mounts or when the id changes
            dispatch(fetchEventsById(id)).then((action) => {
                // Once the action is fulfilled, set the eventprofile state
                if (action.payload) {

                    setEventList(action.payload);
                    console.log("playload ",action.payload);
                    console.log("playload E",eventlist);
                }
            });
        } else {
            let f=events.filter((event) => event.ownerid === id);
            // If the event data is already available, set the eventprofile state
            setEventList(f);
            console.log("not disp ",events);
        }

    }, [dispatch,state]);

    return (
        <div>

        </div>
    );
}

export default Eventlist;