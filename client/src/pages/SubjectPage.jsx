import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Heading from "../components/Heading";
import { useParams } from "react-router-dom";
import Task from "../components/Task";
const subjectApi = require("../apis/subject.api");
const taskApi = require("../apis/task.api");

const Subjects = () => {

    const { id } = useParams();
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [subject, setSubject] = useState({});
    const [currentAssignments, setCurrentAssignments] = useState([]);
    const [previousAssignments, setPreviousAssignments] = useState([]);
    const [upcomingTests, setUpcomingTests] = useState([]);
    const [previousTests, setPreviousTests] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const check = async() => {
            try {
                const response = await subjectApi.getSubjectById(id);
                (response === "INVALID") && (window.location = `/`);
                setRole(response.role);
                setUsername(response.username);
                setSubject(response.subject);
                setStudents(response.students);  
                let tasks = [];          
                const date = new Date();
                const currentTime = Date.parse(date);
                if (response.role === "Student") {
                    const data = await taskApi.getTasksByUsername(response.username, id);
                    console.log(data);
                    tasks = data.tasks;
                }
                else {
                    tasks = response.tasks;
                }
                setUpcomingTests(tasks.filter((task) => {
                    return (task.type === "Test" && (task.deadline + task.duration) > currentTime);
                }));
                setCurrentAssignments(tasks.filter((task) => {
                    return (task.type === "Assignment" && task.deadline > currentTime);
                }));
                setPreviousTests(tasks.filter((task) => {
                    return (task.type === "Test" && (task.deadline + task.duration) <= currentTime);
                }));
                setPreviousAssignments(tasks.filter((task) => {
                    return (task.type === "Assignment" && task.deadline <= currentTime);
                }));
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        check();
    },[id]);

    const add = (e) => {
        let type;
        (e.target.innerText === "New Test") ? type = 'Test' : type = 'Assignment';
        window.location = `/create/${type}/${subject._id}`;
    }

    return (loading) ? <Loader /> :
    <div className = "text-center upper-margin container">
        <Header />
        <Heading heading = {subject.subjectName} />
        <div className = "subject text-left pl-3 pr-3 pt-3 pb-3">
            <li> Subject: <b> {subject.subjectName} </b></li>
            <li> Teacher: <b> {subject.teacherName} </b> </li>
            <li> Schedule: <i> {subject.days.toString() + " at " + subject.time}</i> </li>
            <li> Subject Code: <b> {subject.subjectCode} </b> </li>
            <li> No. of Students: {0}</li>
            <li> 
                No. of Assignments: {previousAssignments.length + currentAssignments.length} 
            </li>
            <li> 
                No. of Tests Conducted: {upcomingTests.length + previousTests.length} 
            </li>
        </div>
        <div className = "mt-3" style = {role === "Student" ? {display: "none"} : null}>
            <button 
                className = "btn expand" 
                onClick = {add}> New Assignment
            </button>
            <button 
                className = "btn expand" 
                onClick = {add}> New Test
            </button>
        </div>
        <div className = "row mt-3">
            <div className = "col-md-6 mt-5 card">
                <h3> Assignments </h3>
                <div className = "mt-4">
                    <h4 className = "text-left"> Current Assignments </h4>
                    {currentAssignments.map((task) => {
                        return (
                            <Task 
                                key = {task._id}
                                username = {username}
                                role = {role}
                                title = {task.title}
                                type = {task.type}
                                taskId = {task._id}
                            />
                        )
                    })}
                </div>
                <div className = "mt-4">
                    <h4 className = "text-left"> Previous Assignments </h4>
                    {previousAssignments.map((task) => {
                        return (
                            <Task 
                                key = {task._id}
                                username = {username}
                                role = {role}
                                title = {task.title}
                                type = {task.type}
                                taskId = {task._id}
                            />
                        )
                    })}
                </div>
            </div>
            <div className = "col-md-6 mt-5 card">
                <h3> Tests </h3>
                <div className = "mt-4">
                    <h4 className = "text-left"> Upcoming Tests </h4>
                    {upcomingTests.map((task) => {
                        return (
                            <Task 
                                key = {task._id}
                                username = {username}
                                role = {role}
                                title = {task.title}
                                type = {task.type}
                                taskId = {task._id}
                            />
                        );
                    })}
                </div>
                <div className = "mt-4">
                    <h4 className = "text-left"> Previous Tests </h4>
                    {previousTests.map((task) => {
                        return (
                            <Task 
                                key = {task._id}
                                username = {username}
                                role = {role}
                                title = {task.title}
                                type = {task.type}
                                taskId = {task._id}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
        <div className = "mb-5 mt-4 text-center">
            <h3> Students </h3>
            {students.map((student) => {
                return (
                    <li key = {student._id} className = "text-left task">
                        {student.username}
                    </li>
                );
            })}
        </div>
    </div>
}

export default Subjects;