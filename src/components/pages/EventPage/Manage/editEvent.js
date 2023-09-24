import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchEventsById, editEvent, changeEditStatus} from "../../../../reduxLib/eventsLib";


function EditEvent() {

    let {id} = useParams();
    const[eventprofile,seteventprofile]=useState();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const events = useSelector((state) => state.eventsreducer.selectedEvent);
    const state= useSelector((state) => state.eventsreducer.state);
    const editstatus= useSelector((state) => state.eventsreducer.editstatus);
    const [editedEvent, setEditedEvent] = useState(eventprofile?eventprofile:'');
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(()=>{
        if (!events || events.id !== id) {
            // Fetch the event by ID when the component mounts or when the id changes
            dispatch(fetchEventsById(id)).then((action) => {
                // Once the action is fulfilled, set the eventprofile state
                if (action.payload) {
                    seteventprofile(action.payload);
                    setEditedEvent(action.payload);
                    console.log(eventprofile);
                }
            });
        } else {
            // If the event data is already available, set the eventprofile state
            seteventprofile(events);
            console.log(events);
        }
    }, [dispatch,id,state])

    useEffect(()=>{
        if(editstatus === 'success'){
            alert('Edit successful!')
            navigate('/eventlist');
            dispatch(changeEditStatus());
        }

    },[editstatus])

   //const [editedEvent, setEditedEvent] = useState(eventprofile?eventprofile:'');
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent({ ...editedEvent, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editEvent(editedEvent));
    };
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };


    return (
        <div>
            <h2 className="my-4">Edit Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={editedEvent.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={editedEvent.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="datetime" className="form-label">Date and Time</label>
                    <input
                        type="text"
                        className="form-control"
                        name="datetime"
                        value={editedEvent.datetime}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={editedEvent.location}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={editedEvent.city}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="public"
                        checked={editedEvent.public}
                        onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="public">Public</label>
                </div>
                {/* Add more input fields for other event properties */}
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}

export default EditEvent;