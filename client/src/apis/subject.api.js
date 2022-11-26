import axios from "axios";

axios.defaults.withCredentials = true;

const backendUrl = "/subjects";

/**
 * The function to add a new course
 * @param {Object} data 
 * @returns the created subject
 */
const createSubject = async(data) => {
    const response = await axios.post(backendUrl, data);
    return response.data;
}

/**
 * The function to delete a course
 * @param {String} subjectId
 * @param {String} username
 */
 const deleteSubject = async(subjectId, username) => {
    const response = await axios.delete(backendUrl + `/${subjectId}/${username}`);
    return response.data;
}

/**
 * The function to remove a student from a subject
 * @param {Object} data 
 * @returns updated subject
 */
const removeStudent = async(subjectId, username) => {
    const response = await axios.post(backendUrl + "/remove", {subjectId, username});
    return response.data;
}

/**
 * The function to fetch subject details from its Id
 * @param {String} subjectId 
 * @returns subject object
 */
const getSubjectById = async(subjectId) => {
    const response = await axios.get(backendUrl + `/${subjectId}`);
    return response.data;
}

export {
    createSubject,
    deleteSubject,
    removeStudent,
    getSubjectById
}
