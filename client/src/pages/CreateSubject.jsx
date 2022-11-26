import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Heading from "../components/Heading";
const subjectApi = require("../apis/subject.api");

const userApi = require("../apis/user.api");

var set = new Set();

const CreateSubject = () => {

    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [subjectName, setSubjectName] = useState("");
    const [time, setTime] = useState("");
    const [classLink, setClassLink] = useState("");

    useEffect(() => {
        const check = async() => {
            try {
                const data = await userApi.checkUser();
                (data === "INVALID") && (window.location = `/`);
                setLoading(false);
                setUsername(data.username);            
            }
            catch(err) {
                console.log(err);
            }
        }
        check();
    },[]);

    const create = async() => {
        try {
            const data = {
                username,
                subjectName,
                time,
                days: Array.from(set),
                classLink
            };
            console.log(set);
            const response = await subjectApi.createSubject(data);
            window.location = `/subject/${response._id}`;
        }
        catch(error) {
            console.log(error);
        }
    }

    const check = (e) => {
        const day = e.target.name;
        if (set.has(day)) {
            set.delete(day);
        }
        else {
            set.add(day);
        }
    }

    return (loading) ? <Loader /> :
    <div className = "container text-center">
        <Header />
        <Heading heading = "Create your Course" />
        <div className = "mt-3">
            <input 
                type = "text" 
                value = {subjectName}
                className = "mt-3 width pt-1 pb-1 pl-2 pr-2" 
                onChange = {(e) => setSubjectName(e.target.value)}
                placeholder = "Name of the Course" 
                required 
            />
        </div>
        <div className = "mt-3">
            <input 
                type = "text"  
                value = {classLink}
                className = "mt-3 width pt-1 pb-1 pl-2 pr-2" 
                onChange = {(e) => setClassLink(e.target.value)}
                placeholder = "Class Link" 
                required 
            />
        </div>
        <div className = "mt-3">
            Class Timings
            <div>
                <input 
                    type = "time" 
                    value = {time}
                    className = "width pt-1 pb-1 pl-2 pr-2" 
                    onChange = {(e) => setTime(e.target.value)}
                    placeholder = "Class Weekly Timings" 
                    required 
                />
            </div>
        </div>
        <div className="weekDays-selector">
            <p className = "mt-2"> Select Days </p>
            <input onClick = {check} name = "Mon" type = "checkbox" id = "weekday-mon" className = "weekday" />
            <label for = "weekday-mon"> Mon </label>
            <input onClick = {check} type = "checkbox" name = "Tue" id = "weekday-tue" className = "weekday" />
            <label for = "weekday-tue"> Tue </label>
            <input onClick = {check} type = "checkbox" name = "Wed" id = "weekday-wed" className = "weekday" />
            <label for = "weekday-wed"> Wed </label>
            <input onClick = {check} type = "checkbox" name = "Thu" id = "weekday-thu" className = "weekday" />
            <label for = "weekday-thu"> Thu </label>
            <input onClick = {check} type = "checkbox" name = "Fri" id = "weekday-fri" className = "weekday" />
            <label for = "weekday-fri"> Fri </label>
            <input onClick = {check} type = "checkbox" name = "Sat" id = "weekday-sat" className = "weekday" />
            <label for = "weekday-sat"> Sat </label>
            <input onClick = {check} type = "checkbox" name = "Sun" id = "weekday-sun" className = "weekday" />
            <label for = "weekday-sun"> Sun </label>
        </div>
        <div className = "mt-3">
            <button 
                className = "btn expand" 
                onClick = {create}> Create
            </button>
        </div>
    </div>;
}

export default CreateSubject;