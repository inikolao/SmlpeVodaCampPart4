import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Dropdown from "bootstrap/js/src/dropdown";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../reduxLib/userLib";


const initialState = {
    "username": "",
    "name": "",
    "surname": "",
    "city": "",
    "email": "",
    "password": ""
}

function Register() {

    const [user, setuser] = useState(initialState);
    const [error, setError] = useState();

    const [selectedOption, setSelectedOption] = useState('');

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let registerstatus = useSelector((state)=> state.userreducer.registerstatus);

    useEffect(()=>{
        if(registerstatus === 'success'){
            alert('Registration successful')
            navigate('/login')
        }

    },[registerstatus])
    const handleSubmit = (event)=>{
        event.preventDefault();
       // console.log('Selected option:', selectedOption);
        user.city=selectedOption;
        //console.log('City option:', user.city);
        console.log('User :', user);
       dispatch(registerUser(user))
        // You can do something with the selected option here


    }

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };



    return (
        <div className="container">
            <h1>Register</h1>
            <p style={{color:'red'}}>{error && error}</p>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" className="form-control" id="username" placeholder="Username" name="username" value={user.username} onChange={(event)=>setuser({...user, [event.target.name]:event.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" placeholder="Name" name="name" value={user.name} onChange={(event)=>setuser({...user, [event.target.name]:event.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname:</label>
                    <input type="text" className="form-control" id="surname" name="surname" placeholder="Surname" value={user.surname} onChange={(event)=>setuser({...user, [event.target.name]:event.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="City">City:</label>
                    <select
                        className="form-select"
                        id="exampleSelect"
                        value={selectedOption}
                        onChange={handleSelectChange}
                    >
                        <option value="">Choose...</option>
                        <option value="Athens">Athens</option>
                        <option value="Paris">Paris</option>
                        <option value="London">London</option>
                        <option value="Ibiza">Ibiza</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Email"  value={user.email} onChange={(event)=>setuser({...user, [event.target.name]:event.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={user.password} onChange={(event)=>setuser({...user, [event.target.name]:event.target.value})}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default Register;