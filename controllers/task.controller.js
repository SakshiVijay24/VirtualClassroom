const Subject = require("../models/subject.model");
const Task = require("../models/task.model");
const User = require("../models/user.model");
const dateHelper = require("../utils/date");
const helper = require("../helper/data");

const addTask = async(req, res, next) => {
    try 
    {
        if(req.user === null) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else if(req.user.username !== req.body.username) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else {
            const data = req.body;
            const deadline = dateHelper.convertDateToMilliseconds(data.date + " " + data.time);
            const task = new Task({
                title: data.title,
                description: data.description,
                type: data.type,
                subjectId: data.subjectId,
                duration: (data.duration * 60 * 1000),
                deadline,
                creator: data.username,
                totalMarks: data.totalMarks,
                submissions: []
            });
            const subject = await Subject.findOne({_id: data.subjectId});
            subject.tasks.push(task);
            const userIds = subject.students;
            for (let id of userIds) {
                const user = await User.findOne({_id: id});
                user.tasks.push(task);
                await user.save();
            }
            subject.save()
            task.save()
            .then((task) => {
                res.json(task);
            })
            .catch((error) => {
                res.json(next(error));
            });
        }
    }
    catch(error) {
        res.json(next(error));
    }
}

const getTaskById = async(req, res, next) => {
    try 
    {
        if(req.user === null) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else if(req.user.username !== req.params.username) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else {
            const task = await Task.findOne({_id: req.params.taskId});
            res.json(task);
        }
    }
    catch(error) {
        res.json(next(error));
    }
}

const submitTask = async(req, res, next) => {
    try 
    {
        if(req.user === null) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else if(req.user.username !== req.body.username) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else {
            const data = req.body;
            const task = await Task.findOne({_id: data.taskId});
            console.log(task);
            const userIndex = task.submissions.findIndex((sub) => 
                JSON.stringify(sub.studentName) === JSON.stringify(data.username)
            );
            if (userIndex !== (-1)) {
                task.submissions[userIndex].submissionLink = data.submissionLink;
            }
            else {
                const submission = {
                    studentName: data.username,
                    submissionLink: data.submissionLink,
                    subjectId: data.subjectId,
                    taskId: data.taskId,
                    marksObtained: 0
                }
                task.submissions.push(submission);
            }
            task.save()
            .then((task) => {
                res.json(task);
            })
            .catch((err) => {
                res.json(next(err));
            });
        }
    }
    catch(error) {
        res.json(next(error));
    }
}

const updateMarks = async(req, res, next) => {
    try 
    {
        if(req.user === null) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else if(req.user.username !== req.body.username) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else {
            const data = req.body;
            const task = await Task.findOne({_id: data.taskId});
            const studentIndex = task.submissions.findIndex((submission) => (
                JSON.stringify(submission.studentName) === JSON.stringify(data.studentName)
            ));
            if (studentIndex !== (-1)) {
                task.submissions[studentIndex].marksObtained = data.marksObtained;
            }
            task.save()
            .then((task) => {
                res.json(task);
            })
            .catch((err) => {
                res.json(next(err));
            });
        }
    }
    catch(error) {
        res.json(next(error));
    }
}

const getTasksByUser = async(req, res, next) => {
    try 
    {
        if(req.user === null) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else if(req.user.username !== req.params.username) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else {
            const user = await User.findOne({username: req.params.username});
            let tasks = await helper.getTasksFromTaskIds(user.tasks);
            console.log(tasks);
            const userTasks = tasks.filter((task) => {
                return (JSON.stringify(task.subjectId) === JSON.stringify(req.params.subjectId))
            });
            console.log(userTasks);
            res.json({tasks: userTasks});
        }
    }
    catch(error) {
        res.json(next(error));
    }
}

const getSubmission = async(req, res, next) => {
    try 
    {
        if(req.user === null) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else if(req.user.username !== req.params.username) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else {
            const task = await Task.findOne({_id: req.params.taskId});
            const userIndex = task.submissions.findIndex((sub) => 
                JSON.stringify(sub.studentName) === JSON.stringify(req.params.username)
            );
            if (userIndex === (-1)) {
                res.json("Not Submitted");
            }
            res.json(task.submissions[userIndex]);
        }
    }
    catch(error) {
        res.json(next(error));
    }
}

module.exports = {
    addTask,
    getTaskById,
    updateMarks,
    submitTask,
    getTasksByUser,
    getSubmission
}