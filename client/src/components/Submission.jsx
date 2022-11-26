import React, { useState } from "react";
const taskApi = require("../apis/task.api");

const Submission = (props) => {

    const [marks, setMarks] = useState(props.marksObtained);
    const [message, setMessage] = useState("");

    const addMarks = async() => {
        try {
            if (marks > props.totalMarks) {
                setMessage("Marks alloted must be less than total marks");
            }
            else {
                const data = {
                    taskId: props.taskId,
                    marksObtained: marks,
                    username: props.username,
                    studentName: props.studentName
                };
                const response = await taskApi.updateMarks(data);
                console.log(response);
                window.location = `/Assignment/Teacher/${props.taskId}`;
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    
    return (

        <div 
            className = "text-left mt-2 task pl-3 pr-3 pt-2 pb-2"
            style = {(props.status !== "Previous") ? {display: "none"}: null}
        >
            <div> Submitted By: {props.studentName} </div>
            <div> Submission: {props.submissionLink} </div>
            <div> Marks Alloted: {props.marksObtained} / {props.totalMarks} </div>
            <div>
                Update Marks: 
                <input 
                    type = "number" 
                    value = {marks}
                    className = "mt-1 ml-2" 
                    onChange = {(e) => setMarks(e.target.value)}
                    placeholder = "Enter Marks" 
                />
            </div>
            <div className = "text-center"> {message} </div>
            <div className = "text-center">
                <button 
                    className = "btn expand" 
                    onClick = {addMarks}> Update
                </button>
            </div>
        </div>
    )
}

export default Submission;