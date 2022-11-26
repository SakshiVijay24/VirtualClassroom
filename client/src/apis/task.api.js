import axios from "axios";

axios.defaults.withCredentials = true;

const backendUrl = "/tasks";

/**
 * Function to add a new Task
 * @param {Object} data
 * @returns added Task Data
 */
const addTask = async(data) => {
    const response = await axios.post(backendUrl, data);
    return response.data;
}

/**
 * Function to get task details from taskId
 * @param {String} taskId 
 * @returns Task details
 */
const getTaskById = async(taskId, username) => {
    const response = await axios.get(backendUrl + "/task/" + taskId + "/" + username);
    return response.data;
}

/**
 * Function to get Tasks of a user
 * @param {String} username 
 * @returns list of tasks of a user
 */
const getTasksByUsername = async(username, subjectId) => {
    const response = await axios.get(backendUrl + `/${username}/${subjectId}`);
    return response.data;
}

const getSubmission = async(taskId, username) => {
    const response = await axios.get(backendUrl + `/submission/${taskId}/${username}`);
    return response.data;
}

/**
 * Function to add submission to a task
 * @param {Object} data 
 * @returns updated Task
 */
const submitTask = async(data) => {
    const response = await axios.post(backendUrl + `/submit`, data);
    return response.data;
}

/**
 * Function to update the marks of a student's submission of a task
 * @param {Object} data 
 * @returns updated Task
 */
const updateMarks = async(data) => {
    const response = await axios.post(backendUrl + `/marks`, data);
    return response.data;
}

export {
    addTask,
    getTaskById,
    submitTask,
    updateMarks,
    getTasksByUsername,
    getSubmission
}