/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import Loader from "../components/Loader";
const userApi = require("../apis/user.api.js");
const APP_ID = "3386313148-i8i8cs3urnoql1i2plgm34e6ipovq6r8.apps.googleusercontent.com";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const check = async() => {
            try {
                const user = await userApi.checkUser();
                (user !== "INVALID") && (window.location = `/home`);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        check();
    },[]);

    const add = (e) => {
        e.preventDefault();
        const drop = async() => {
            try {
                if(role === "Student" || role === "Teacher") {
                    const user = await userApi.loginUser(email, password, role);
                    if(user === undefined) {
                        setMessage("User Not Found");
                    } 
                    else {
                        setMessage(" ");
                        window.location = "/home";
                    }
                }
                else {
                    setMessage("Please select designation: Student / Teacher");
                }
            }
            catch(error) {
                console.log(error);
                setMessage("User Not Found");
            } 
        }
        drop();
    }

    const successGoogle = (response) => {
        const post = async() => {
            try {
                if(role === "Student" || role === "Teacher") {
                    const user = await userApi.LoginWithGoogle(response.tokenId, role);
                    if(user === undefined) {
                        setMessage("User Not Found");
                    }
                    else {
                        window.location = "/home";
                    }
                }
                else {
                    setMessage("Please select designation: Student / Teacher");
                }
            }
            catch(error) {
                console.log(error);
            }
        }
        post();
    }

    const failureGoogle = () => {
        if(role === "Student" || role === "Teacher") {
            setMessage("Google Login Failed");
        }
        else {
            setMessage("Please select designation: Student / Teacher");
        }
    }

    const changeRole = (e) => {
        setRole(e.target.value);
    }

    return (loading) ? <Loader /> :
    <div className = "text-center upper-margin">
        <h2> Login to Your Account </h2>
        <form onSubmit = {add}>
            <div>
                <input 
                    type = " email" 
                    value = {email}
                    className = "mt-2 width" 
                    onChange = {(e) => setEmail(e.target.value)}
                    placeholder = "Email" 
                    autoComplete = "off" 
                    required 
                />
            </div>
            <div>
                <input 
                    type = "password" 
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    className = "mt-2 width" 
                    placeholder = "Password" 
                    required 
                />
            </div>
            <div className = "mt-3" onChange = {changeRole}>
                <span className = "mr-4">
                    <input 
                        type = "radio" 
                        className = "mr-2"
                        value = "Student"
                        name = "role"
                    /> 
                    Student
                </span>
                <span className = "ml-4">
                    <input 
                        type = "radio" 
                        className = "mr-2"
                        value = "Teacher"
                        name = "role"
                    /> 
                    Teacher
                </span>
            </div> 
            <div className = "mt-2">
                {message}
            </div>
            <div className = "mt-2">
                <input 
                    type = "submit" 
                    className = "btn btn-lg expand" 
                    value = "Login"
                /> 
            </div>
        </form>
        <div className = "mt-2">
            New User ? 
            <Link to = "/register"> Create a New account </Link>
        </div>
        <div className = "mt-2">
            <h3> OR </h3>
        </div>
        <div>
            <GoogleLogin
                clientId = {APP_ID}
                buttonText = "Login With Google"
                onSuccess = {successGoogle}
                onFailure = {failureGoogle}
                className = "btn btn-lg expand google"
                cookiePolicy = {'single_host_origin'}
            />
        </div>
    </div>
}

export default Login;