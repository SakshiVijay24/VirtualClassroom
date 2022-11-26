const Subject = require("../models/subject.model");
const Task = require("../models/task.model");
const User = require("../models/user.model");

/**
 * Function to fetch subjects data from their IDs
 * @param {Array} subjectIds 
 * @returns list of subjects
 */
const getSubjectsFromSubjectIds = async(subjectIds) => {
    const subjects = [];
    for (let id of subjectIds) {
        const subject = await Subject.findOne({_id: id});
        subjects.push(subject);
    }
    return subjects;
}

/**
 * Function to fetch tasks data from their IDs
 * @param {Array} taskIds 
 * @returns list of tasks
 */
const getTasksFromTaskIds = async(taskIds) => {
    const tasks = [];
    for (let id of taskIds) {
        const task = await Task.findOne({_id: id});
        tasks.push(task);
    }
    return tasks;
}

/**
 * Function to fetch task data from its ID
 * @param {String} taskId 
 * @returns task details
 */
const getTaskFromTaskId = async(taskId) => {
    const task = await Task.findOne({_id: taskId});
    return task;
}

/**
 * Function to get users from user IDs
 * @param {Array} userIds 
 * @returns list of users
 */
const getUsersfromUserIds = async(userIds) => {
    const users = [];
    for (let id of userIds) {
        const user = await User.findOne({_id: id});
        users.push(user);
    }
    return users;
}

module.exports = {
    getSubjectsFromSubjectIds,
    getTasksFromTaskIds,
    getTaskFromTaskId,
    getUsersfromUserIds
}