import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeRegisterStatus} from "../../../../reduxLib/eventsLib";
import {addEvent} from "../../../../reduxLib/eventsLib";

const initialState ={
    "title": "",
    "description": "",
    "datetime": "",
    "location": "",
    "city": "",
    "ownerid": 0,
    "public": false,
}

function AddEvent() {

    const [eventreg, setEventreg] = useState(initialState);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState('');
    let registerstatus = useSelector((state)=> state.eventsreducer.registerstatus);
    let isLoggedin = useSelector((state)=> state.userreducer.loginstatus);
    //let isLoggedin = useSelector((state)=> state.userreducer.id);

    useEffect(()=>{
        if(registerstatus === 'success'){
            alert('Registration successful')
            navigate('/login')
            dispatch(changeRegisterStatus());
        }

    },[registerstatus]);

    const handleSubmit = (event)=>{
        event.preventDefault();
        // console.log('Selected option:', selectedOption);
        //console.log('City option:', user.city);
        dispatch(addEvent(eventreg));
        // You can do something with the selected option here


    }

    return (
        <div className="container">
            <h1>Add New Event</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Event Title:</label>
                    <input type="text" className="form-control" id="title" placeholder="Title" name="title" value={eventreg.title} onChange={(event)=>setEventreg({...eventreg, [event.target.name]:event.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Description:</label>
                    <input type="text" className="form-control" id="Description" placeholder="Description" name="description" value={eventreg.description} onChange={(event)=>setEventreg({...eventreg, [event.target.name]:event.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Datetime:</label>
                    <input type="datetime-local" className="form-control" id="datetime" name="datetime" placeholder="Datetime" value={eventreg.datetime} onChange={(event)=>setEventreg({...eventreg, [event.target.name]:event.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="City">Location:</label>
                    <input type="text" className="form-control" id="location" name="location" placeholder="Location" value={eventreg.location} onChange={(event)=>setEventreg({...eventreg, [event.target.name]:event.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">City:</label>
                    <input type="email" className="form-control" id="city" name="city" placeholder="City"  value={eventreg.city} onChange={(event)=>setEventreg({...eventreg, [event.target.name]:event.target.value})}/>
                </div>
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="public"
                        checked={eventreg.public}
                        onChange={(event)=>setEventreg({...eventreg, [event.target.name]:event.target.checked})}
                    />
                    <label className="form-check-label" htmlFor="public">Public</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default AddEvent;