import React from "react";

const Task = (props) => {
    return (
        <li className = "text-left task">
            <span> {props.title} </span>
            <span className = "move-right"> 
                <a 
                href = {"/" + props.type + "/" + props.role + `/${props.taskId}`}> 
                View 
                </a> 
            </span>
        </li>
    )
}

export default Task;