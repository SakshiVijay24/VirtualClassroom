import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (<div className="text-center upper-margin"> 
        <span className = "mt-5"> <Spinner animation = "border" variant = "success" size = "lg"/> </span>
    </div>);
};

export default Loader;