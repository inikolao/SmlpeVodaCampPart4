import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {logoutUser} from "../../../reduxLib/userLib";
import {useNavigate} from "react-router-dom";

function Logout() {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(()=>{
        dispatch(logoutUser());

        navigate('/');
    },[]);

    return (
        <div>

        </div>
    );
}

export default Logout;