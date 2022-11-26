import React from "react";
const subjectApi = require("../apis/subject.api");

const Subject = (props) => {

    const view = () => {
        window.location = `/subject/${props.id}`;
    }

    const leave = async() => {
        try {
            if (props.role === "Teacher") {
                const response = await subjectApi.deleteSubject(props.id, props.username);
                console.log(response);
                window.location = "/home";
            }
            else if (props.role === "Student") {
                const response = await subjectApi.removeStudent(props.id, props.username);
                console.log(response);
                window.location = "/home";
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
    <div className = "mt-3 subject">
        <div className = "top">
            <span className = "head">{props.subjectName}</span>
            <p> by {props.teacherName} </p>
        </div>
        <div className = "bottom">
            <div className = "mt-1">
                Schedule: <i> {props.days + " at " + props.time + " hrs "} </i>
            </div>
            <div className = "mt-1">
                Class Code: <b>{props.subjectCode}</b>
            </div>
            <div className = "mt-1">
                Class Link: {props.subjectLink}
            </div>
            <div className = "text-center mt-1">
                <button 
                    className = "btn expand" 
                    onClick = {view}> Go To Class
                </button>
                <button 
                    className = "btn expand" 
                    onClick = {leave}> {props.text}
                </button>
            </div>
        </div>
    </div>);
}

export default Subject;