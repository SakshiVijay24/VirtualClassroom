import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import Heading from "../../components/Heading";
import { useParams } from "react-router-dom";
import Submission from "../../components/Submission";
const userApi = require("../../apis/user.api.js");
const taskApi = require("../../apis/task.api");

const TestPage = () => {

    const type = "Assignment";
    const { id } = useParams();
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [task, setTask] = useState({});
    const [submissions, setSubmissions] = useState([]);
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const check = async() => {
            try {
                const user = await userApi.checkUser();
                (user === "INVALID") && (window.location = `/`);
                setLoading(false);
                setUsername(user.username);            
                setRole(user.role);
                const response = await taskApi.getTaskById(id, user.username);
                setTask(response);
                var date = new Date(response.deadline);
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
                setDate(date.toLocaleString('en-US', { timeZone: 'GMT'}));
                setSubmissions(response.submissions);
            }
            catch(err) {
                userApi.logoutUser();
                console.log(err);
            }
        }
        check();
    },[id]);

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
        </div>
        <div className = "mt-4">
        <h3> Submissions </h3>
            <p className = "mt-2"> Note: Only submissions of Previous assignments can be viewed and graded </p>
            <h4 
                className = "mt-2"
                style = {(status === "Previous" && submissions.length > 0) ? {display: "none"} : null}
            > 
                No Submissions
            </h4>
            {submissions.map((submission) => {
                return (
                    <Submission
                        key = {username}
                        username = {username}
                        role = {role}
                        type = {type}
                        studentName = {submission.studentName}
                        submissionLink = {submission.submissionLink}    
                        marksObtained = {submission.marksObtained}
                        totalMarks = {task.totalMarks}
                        taskId = {task._id}
                        status = {status}
                    />);
            })}
        </div>
    </div>
}

export default TestPage;