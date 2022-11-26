import React, { useState } from "react";
const userApi = require("../apis/user.api");

const Classroom = (props) => {

    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");

    const createClass = () => {
        window.location = "/new"
    }

    const join = async() => {
        try {
            const data = {
                subjectCode: code, 
                username: props.username,
                role: props.role
            }
            const response = await userApi.joinSubject(data);
            if(response === "Invalid Code") {
                setMessage(response);
            }
            else {
                window.location = `/subject/${response._id}`;
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div className = "mt-3 text-center">
        <button 
            className = "btn expand" 
            style = {props.role === "Student" ? {display: "none"} : null}
            onClick = {createClass}> Create a Class
        </button>
        <div style = {props.role === "Teacher" ? {display: "none"} : null}>
            <input 
                type = "text" 
                name = "code" 
                value = {code}
                className = "mt-3 pt-1 pb-1 pl-2 pr-2" 
                onChange = {(e) => setCode(e.target.value)}
                placeholder = "Enter classroom code" 
                autoComplete = "off" 
                required 
            />
            <button 
                className = "btn expand" 
                onClick = {join}> Join
            </button>
            <p className = "mt-3"> {message} </p>
        </div>
    </div>);
}

export default Classroom;