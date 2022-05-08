import React,{ useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import Logo from '../assets/logo.svg';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

import { registration } from '../utils/APIRoutes'

const Register = () =>{


    const[values,setValues] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const toastOptions = {
        position:"bottom-right",
        autoClose:3000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    };
    
    const navigate = useNavigate();

    const handleChange = event =>{
        setValues({...values,[event.target.name]:event.target.value});
    };

    const handleValidation = () =>{
        const{username,email,password,confirmPassword} = values;

        if(password !== confirmPassword){
            console.log("the two passwords don't match");
            toast.error("Password and confirm password should have same values...",toastOptions);
            return false;
        }else if(username.length < 3){
            toast.error("Username should be greater than 3 letters ", toastOptions);
            return false;
        }else if(password.length < 5){
            toast.error("Password should be equal or greater than 5 caracters", toastOptions);
            return false;
        }else if(email === ''){
            toast.error("Email is required !",toastOptions);
            return false;
        }
        return true; 
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(handleValidation()){
            const{username,email,password,confirmPassword } = values;
            const { data } = await axios.post(registration,{ username,email,password });

            if(data.status === false){
                toast.error(data.message, toastOptions);
            }
            if(data.status === true){
                localStorage.setItem('user-datas',JSON.stringify(data.user));
                navigate('/');
            }

        }
    }

    useEffect(() =>{
        if(localStorage.getItem('jwt-token')){
            navigate('/chat');
        }
    },[])

    return(
        <>
            <FormContainer>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>PLANEV</h1>
                    </div>
                    <input 
                        type='text' 
                        placeholder="Username" 
                        name="username" 
                        onChange={(event) => handleChange(event)}
                    />
                    <input 
                        type='email' 
                        placeholder="Email" 
                        name="email" 
                        onChange={(event) => handleChange(event)}
                    />
                    <input 
                        type='password' 
                        placeholder="Password" 
                        name="password" 
                        onChange={(event) => handleChange(event)}
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        name="confirmPassword" 
                        onChange={(event) => handleChange(event)}
                    />
                    <button type="submit">Create User</button>
                    <span>Already have an account ? <Link to='/'> Go to login page </Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
};


const FormContainer = styled.div`
    height :100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:1rem;
    align-items:center;
    background-color:#131324;
    .brand {
        display: flex;
        align-items:center;
        gap:1rem;
        justify-content:center;
        img{
            height:5rem;
        }
        h1{
            color:white;
            text-transform:uppercase;
        }
    }
    form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:#00000076;
        border-radius:2rem;
        padding:3rem 5rem;
        input{
            background-color:transparent;
            padding:1rem;
            border:0.1rem solid #4e0eff;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-size:1rem;
            &:focus{
                border:0.1rem solid #997af0;
                outline:none;
            }
        }button{
            background-color:#997af0;
            color:white;
            padding:1rem 2rem;
            border:none;
            font-weight:bold;
            cursor:pointer;
            border-radius:0.4rem;
            font-size:1rem;
            text-transform:uppercase;
            transition:0.5s ease-in-out;
            &:hover{
                background-color:#4e0eff;
            }
        }
        span{
            color:white;
            text-transform:uppercase;
            a{
                color:#4e0eff;
                text-decoration:none;
                font-weight:bold;
            }
        }
    }
`;

export default Register;