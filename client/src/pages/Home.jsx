import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Subject from "../components/Subject";
import Classroom from "../components/Classroom";
const userApi = require("../apis/user.api.js");

const Home = () => {

    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const check = async() => {
            try {
                const data = await userApi.checkUser();
                (data === "INVALID") && (window.location = `/`);
                setLoading(false);
                setUsername(data.username);            
                setRole(data.role);
                setSubjects(data.subjects);
            }
            catch(err) {
                userApi.logoutUser();
                console.log(err);
            }
        }
        check();
    },[]);

    return (loading) ? <Loader /> :
    <div className = "text-center container">
        <Header />
        <Classroom role = {role} username = {username}/>
        <Heading heading = "My Classrooms" />
        <div className = "mt-3 text-center">
            {subjects.map((subject) => {
                return (
                    <Subject 
                        key = {subject._id}
                        id = {subject._id}
                        subjectName = {subject.subjectName}
                        time = {subject.time}
                        days = {subject.days.toString()}
                        username = {username}
                        teacherName = {subject.teacherName}
                        text = {(role === "Teacher") ? "Delete" : "Leave"}
                        role = {role}
                        subjectCode = {subject.subjectCode}
                        subjectLink = {subject.subjectLink}
                        students = {subject.students}
                        tasks = {subject.tasks}
                    />
                );
            })}
        </div>
    </div>
}

export default Home;