import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import Heading from "../../components/Heading";
import { useParams } from "react-router-dom";
const userApi = require("../../apis/user.api.js");
const taskApi = require("../../apis/task.api");

const TestPage = () => {

    const { id } = useParams();
    const [username, setUsername] = useState("");
    const [task, setTask] = useState({});
    const [submissionLink, setSubmissionLink] = useState("");
    const [date, setDate] = useState("");
    const [marksObtained, setMarksObtained] = useState(0);
    const [loading, setLoading] = useState(true);
    const [link, setLink] = useState("");
    const [status, setStatus] = useState("Previous");

    useEffect(() => {
        const check = async() => {
            try {
                const user = await userApi.checkUser();
                (user === "INVALID") && (window.location = `/`);
                setLoading(false);
                setUsername(user.username);            
                const response = await taskApi.getTaskById(id, user.username);
                setTask(response);
                const data = await taskApi.getSubmission(id, user.username);
                const currentTime = Date.parse(new Date());
                const deadline = response.deadline;
                const duration = response.duration;
                if (currentTime >= deadline && currentTime <= (deadline + duration)) {
                    setStatus("Running");
                }
                else if (currentTime < deadline) {
                    setStatus("Upcoming");
                }
                else {
                    setStatus("Previous");
                }
                var d = new Date(deadline);
                if (data === "Not Submitted") {
                    setSubmissionLink(data);
                }
                else {
                    setSubmissionLink(data.submissionLink);
                    setMarksObtained(data.marksObtained);
                    setLink(data.submissionLink);
                }
                setDate(d.toLocaleString('en-US', { timeZone: 'GMT'}));
            }
            catch(err) {
                userApi.logoutUser();
                console.log(err);
            }
        }
        check();
    },[id]);

    const submit = async() => {
        try {
            const data = {
                username,
                submissionLink: link,
                subjectId: task.subjectId,
                taskId: id
            };
            const response = await taskApi.submitTask(data);
            console.log(response);
            window.location = `/subject/${task.subjectId}`;
        }
        catch(err) {
            console.log(err);
        }
    }

    return (loading) ? <Loader /> :
    <div className = "text-center upper-margin container">
        <Header />
        <Heading heading = "Test" />
        <div className = "subject mt-4 text-left pl-3 pr-3 pt-3 pb-3">
            <h3> {task.title} </h3> 
            <li> Description: {task.description} </li>
            <li> Total Marks: {task.totalMarks} </li>
            <li> Test Date: {date} </li>
            <li> Test Duration: {task.duration / 60000} minutes </li>
            <li> Marks obtained: {marksObtained} / {task.totalMarks} </li> 
            <li> My Submission: {submissionLink} </li>
            <li style = {(status !== "Running") ? {display: "none"}: null}>
                Add Submission Link:
                <input 
                    type = "text" 
                    value = {link}
                    className = "mt-1 ml-2" 
                    onChange = {(e) => setLink(e.target.value)}
                    placeholder = "Enter Submission Link" 
                />
                
            </li>
            <div style = {(status !== "Running") ? {display: "none"}: null} className = "text-center">
            <button 
                className = "btn expand" 
                onClick = {submit}> Submit
            </button>
            </div>
        </div>

    </div>
}

export default TestPage;