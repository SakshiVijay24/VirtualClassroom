/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import Loader from "../components/Loader";
const userApi = require("../apis/user.api.js");
const APP_ID = "3386313148-i8i8cs3urnoql1i2plgm34e6ipovq6r8.apps.googleusercontent.com";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(" ");
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState("");

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
                    const response = await userApi.registerUser(
                        username, email, password, role);
                    if(response === "Username already exists" 
                        || response === "Email already exists") {
                        setMessage(response);
                    }
                    else {
                        window.location = "/";
                        setMessage("");
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
        <h2> Register Your Account </h2>
            <form onSubmit = {add}>
                <div>
                    <input 
                        type = "text" 
                        name = "username" 
                        value = {username}
                        className = "mt-3 width" 
                        onChange = {(e) => setUsername(e.target.value)}
                        placeholder = "Username" 
                        autoComplete = "off" 
                        required 
                    />
                </div>
                <div>
                    <input 
                        type = "email" 
                        name = "email" 
                        value = {email}
                        className = "mt-3 width" 
                        onChange = {(e) => setEmail(e.target.value)}
                        placeholder = "email" 
                        autoComplete = "off" 
                        required 
                    />
                </div>
                <div>
                    <input 
                        type = "password" 
                        name = "password" 
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        className = "mt-3 width" 
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
                        value = "Register"
                    /> 
                </div>
                <div className="mt-3">
                    Already have an account ? 
                    <Link to="/"> Login here </Link>
                </div>
            </form>
            <div className = "mt-3">
                <h3> OR </h3>
            </div>
            <div className = "mt-3">
                <GoogleLogin
                    clientId = {APP_ID}
                    buttonText = "Login With Google"
                    onSuccess = {successGoogle}
                    onFailure = {failureGoogle}
                    className = "btn btn-lg expand"
                    cookiePolicy = {'single_host_origin'}
                />
            </div>
    </div>
}

export default Register;