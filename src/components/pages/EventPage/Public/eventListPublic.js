import React, {useEffect, useState} from 'react';
import eventprofile from "../eventprofile";
import {useDispatch, useSelector} from "react-redux";
import {fetchEvents, fetchEventsById} from "../../../../reduxLib/eventsLib";



function EventListPublic() {
    const [index, setIndex] = useState(0);
    const[eventlist,setEventList]=useState();
    const dispatch = useDispatch();
    const events = useSelector((state) => state.eventsreducer.eventsList);
    const state= useSelector((state) => state.eventsreducer.state);
    //let k=0;


    useEffect(()=> {
        console.log('event profiles');
       // setIndex(k++);
       // console.log("koita k "+k);
        if (!events || events.length === 0) {
            // Fetch the event by ID when the component mounts or when the id changes
            dispatch(fetchEvents()).then((action) => {
                // Once the action is fulfilled, set the eventprofile state
                if (action.payload) {
                    setEventList(action.payload);
                    console.log(action.payload);
                }
            });
        } else {
            // If the event data is already available, set the eventprofile state
            setEventList(events);
            console.log(events);
        }

    }, [dispatch,state]);



    return (
        <div>
            <div id="navigation" className="text-center">
                <button
                    data-testid="button-restart"
                    disabled={index === 0}
                    onClick={() => setIndex(0)}
                    className="small outlined"
                >
                    Restart
                </button>
                <button
                    data-testid="button-prev"
                    disabled={index === 0}
                    onClick={() => setIndex(index - 1)}
                    className="small"
                >
                    Prev
                </button>
                <button
                    data-testid="button-next"
                    onClick={() => setIndex(index + 1)}
                    disabled={index === events.length - 1}
                    className="small"
                >
                    Next
                </button>
            </div>
            {
                eventlist?
                <div id="slide" className="card text-center">
                <h1 data-testid="title"><a href={`/eventprofile/${eventlist[index].id}`}>{eventlist[index].title}</a>
                </h1>
                <p data-testid="description">{eventlist[index].description}</p>
                <p data-testid="location">{eventlist[index].location}</p>
                <img src={require(`../../../rawFiles/${eventlist[index].files[0].file1}.jpg`)} height="600"/>
            </div> : ''
            }
        </div>
    );
}

export default EventListPublic;