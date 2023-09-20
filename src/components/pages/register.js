import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const initialState = {
    "username": "",
    "name": "",
    "surname": "",
    "email": "",
    "password": ""
}

function Register() {

    const [user, setuser] = useState(initialState);
    const [error, setError] = useState();

    return (
        <div className="container">
            <h1>Register</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" className="form-control" id="username" name="username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" name="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname:</label>
                    <input type="text" className="form-control" id="surname" name="surname"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" name="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Username:</label>
                    <input type="password" className="form-control" id="password" name="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Register;