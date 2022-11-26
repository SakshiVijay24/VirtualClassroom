import axios from "axios";

axios.defaults.withCredentials = true;

const backendUrl = "/users";

/**
 * The function to check the authentication status of a user
 */
var checkUser = async() => {
   const user = await axios.get(backendUrl + "/auth");
   return user.data;
}

const logoutUser = async() => {
    await axios.post(backendUrl + "/logout");
}

/**
 * The function to login the user
 * @param {String} email 
 * @param {String} password 
 * @param {boolean} rememberMe 
 * @param {String} role
 */
 const loginUser = async(email, password, role) => {
    const userData = await axios.post(backendUrl + "/login", {email, password, role});
    return userData.data.user;
}

/**
 * The function to register new user
 * @param {String} username 
 * @param {String} email 
 * @param {String} password 
 * @param {String} role
 */
const registerUser = async(username, email, password, role) => {
    const user = await axios.post(backendUrl + "/register", {username, email, password, role});
    return user.data;
}

/**
 * The function to login a user with google
 * @param {String} tokenId 
 * @param {String} role
 */
const LoginWithGoogle = async(tokenId, role) => {
    const userData = await axios.post(backendUrl + "/googlelogin", {token: tokenId, role});
    return userData.data.user;
}

/**
 * The function to add a student to subject
 * @param {Object} data 
 * @returns 
 */
const joinSubject = async(data) => {
    const response = await axios.post(backendUrl + "/join", data);
    return response.data;
}

export { checkUser, loginUser, registerUser, LoginWithGoogle, joinSubject, logoutUser };