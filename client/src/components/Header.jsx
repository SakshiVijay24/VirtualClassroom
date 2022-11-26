import React from "react";
const userApi = require("../apis/user.api.js");

const Header = () => {

    const logout = async() => {
        await userApi.logoutUser();
        window.location = "/";
    }

    const home = () => {
        window.location = "/home"
    }

    return (
    <div className = "text-center upper-margin">
        <span className = "mt-3">
            <h1> VIRTUAL CLASSROOM </h1>
        </span>
        <span className = "mt-3 text-right">
            <button 
                className = "btn expand mr-2" 
                onClick = {logout}> Logout 
            </button>
            <button 
                className = "btn expand ml-2" 
                onClick = {home}> Home
            </button>
        </span>
    </div>);
}

export default Header;