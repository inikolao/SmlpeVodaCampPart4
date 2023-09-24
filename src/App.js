import logo from './logo.svg';
import './App.css';
import Button from "./components/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import $ from 'jquery';
import Header from "./components/topdown/Header";
import Footer from "./components/topdown/Footer";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from "./components/pages/register";
import {useState} from "react";
import Login from "./components/pages/LoginPage/login";
import Logout from "./components/pages/LoginPage/logout";
import Eventlist from "./components/pages/EventPage/Manage/eventlist";
import Profile from "./components/profile";
import EventListPublic from "./components/pages/EventPage/Public/eventListPublic";
import Eventprofile from "./components/pages/EventPage/eventprofile";
import EditEvent from "./components/pages/EventPage/Manage/editEvent";
import AddEvent from "./components/pages/EventPage/Manage/addEvent";

function App() {
    const [token, setToken] = useState();
    return (

    <div className="App">
        <BrowserRouter>
        <Header />
            <Routes>
                <Route path='/' element={<EventListPublic/>}></Route>
                <Route path='/' element={<EventListPublic/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/eventlist' element={<Eventlist/>}></Route>
                <Route path='/logout' element={<Logout/>}></Route>
                <Route path='/profile/:username' element={<Profile/>}></Route>
                <Route path='/eventprofile/:id' element={<Eventprofile/>}></Route>
                <Route path='/edit/:id' element={<EditEvent/>}></Route>
                <Route path='/eventadd' element={<AddEvent/>}></Route>
            </Routes>
        </BrowserRouter>

        <Footer />
    </div>
  );
}

export default App;
