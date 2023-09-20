import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function LoginPage() {

    // Declare state variables for email and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform login logic here (e.g., API call)
        console.log('Login credentials:', { username, password });

        const data = {
            username,
            password,
        };

        try {
            // Make a POST request to the login API endpoint
            const response = await fetch('http://localhost:3001/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                //body: JSON.stringify(data),
            });


            if (response.ok) {

                let result = await response.json();
                alert(JSON.stringify(result));
                alert("kaa1 "+JSON.stringify(username));
                const userData=result.find((users) => users.username === username);
                alert("kaa "+JSON.stringify(userData));

                if (userData) {
                    if (userData.password !== password) {
                        // Invalid password
                        alert("Invalid password");

                    } else {
                        alert("success");
                    }
                } else {
                    // Username not found
                    alert("not fount");
                }


                // Login successful, perform necessary actions (e.g., redirect, update state)
                console.log('Login successful');
                //return sessionStorage.
            } else {
                // Handle login failure (e.g., display error message)
                console.log('Login failed');
            }
        } catch (error) {
            // Handle error in case of network failure or other issues
            console.error('Error:', error);
        }
    };

        return (<div className="container">
        <h2>Login Page</h2>
        <form action="/LoginPage/login" method="post" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" className="form-control" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" name="password" value={password}  onChange={(e) => setPassword(e.target.value)}
                       placeholder="Enter password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>);
}

export default LoginPage;