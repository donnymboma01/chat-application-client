import React from "react";
import { useNavigate } from "react-router-dom";

const Chat = () =>{

    const navigate = useNavigate();

    const logout = () =>{
        localStorage.removeItem('jwt-token');
        navigate('/');
    };

    return(
        <div>
            <h1>Welcome to the chat application </h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};


export default Chat;