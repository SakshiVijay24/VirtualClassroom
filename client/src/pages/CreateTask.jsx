import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { useParams } from "react-router-dom";
const userApi = require("../apis/user.api");
const taskApi = require("../apis/task.api");

const CreateTask = () => {

    const { type } = useParams();
    const { subjectId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [totalMarks, setTotalMarks] = useState(0);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [dateText, setDateText] = useState("");
    const [timeText, setTimeText] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const check = async() => {
            try {
                const data = await userApi.checkUser();
                (data === "INVALID") && (window.location = `/`);
                setLoading(false);
                setUsername(data.username); 
                ((type === "Test") ? setDateText("Test Date") : setDateText("Last Date"));           
                ((type === "Test") ? setTimeText("Time of Test") : setTimeText("Submission Deadline"));           
            }
            catch(err) {
                console.log(err);
            }
        }
        check();
    });

    const create = async() => {
        try {
            const data = {
                username,
                title,
                description,
                totalMarks,
                subjectId,
                duration,
                type,
                date,
                time
            };
            const response = await taskApi.addTask(data);
            console.log(response);
            window.location = `/subject/${subjectId}`;
        }
        catch(error) {
            console.log(error);
        }
    }

    return (loading) ? <Loader /> :
    <div className = "container text-center">
        <Header />
        <Heading heading = {"Create your " + type} />
        <div className = "mt-3 text-left">
            <span> <b> Title: </b> </span>
            <div>
                <input 
                    type = "text" 
                    name = "title" 
                    value = {title}
                    className = "pt-1 pb-1 pl-2 pr-2" 
                    style = {{width: "100%"}}
                    onChange = {(e) => setTitle(e.target.value)}
                    placeholder = {"Title of " + type} 
                    autoComplete = "off" 
                    required 
                />
            </div>
        </div>
        <div className = "mt-3 text-left">
            <span> <b> Description: </b> </span>
            <div>
                <textarea 
                    name = "description" 
                    rows = {5}
                    value = {description}
                    className = "pt-1 pb-1 pl-2 pr-2" 
                    style = {{width: "100%"}}
                    onChange = {(e) => setDescription(e.target.value)}
                    placeholder = {"Description of " + type} 
                    autoComplete = "off" 
                    required 
                />
            </div>
        </div>
        <div className = "mt-3 text-left">
            <span> <b> Total Marks: </b> </span>
            <input 
                type = "number" 
                name = "totalMarks" 
                value = {totalMarks}
                className = "pt-1 pb-1 pl-2 pr-2" 
                style = {{width: "100%"}}
                onChange = {(e) => setTotalMarks(e.target.value)}
                required 
            />
        </div>
        <div className = "mt-3 text-left">
            <span> <b> {dateText}: </b> </span>
            <input 
                type = "date" 
                value = {date}
                className = "pt-1 pb-1 pl-2 pr-2" 
                style = {{width: "100%"}}
                onChange = {(e) => setDate(e.target.value)}
                required 
            />
        </div>
        <div className = "mt-3 text-left">
            <span> <b> {timeText}: </b> </span>
            <input 
                type = "time" 
                value = {time}
                className = "pt-1 pb-1 pl-2 pr-2" 
                style = {{width: "100%"}}
                onChange = {(e) => setTime(e.target.value)}
                required 
            />
        </div>
        <div style = {type === "Assignment" ? {display: "none"} : null} className = "mt-3 text-left">
            <span> <b> Duration (in minutes) </b> </span>
            <input 
                type = "number"  
                value = {duration}
                className = "pt-1 pb-1 pl-2 pr-2" 
                style = {{width: "100%"}}
                onChange = {(e) => setDuration(e.target.value)}
                required 
            />
        </div>
        <div className = "mt-3 mb-5">
            <button 
                className = "btn expand" 
                onClick = {create}> Create
            </button>
        </div>
    </div>;
}

export default CreateTask;