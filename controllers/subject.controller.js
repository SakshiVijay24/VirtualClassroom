const Subject = require("../models/subject.model");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const redis = require("../utils/redis"); 
const helper = require("../helper/data");
const Task = require("../models/task.model");

const addSubject = async(req, res, next) => {
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
            let subjectCode;
            while (true) {  // CREATING A UNIQUE SUBJECT CODE
                subjectCode = uuidv4().replace(/-/g,'').substring(0, 6);
                let existingSubject = await Subject.findOne({subjectCode});
                if(existingSubject === null) break;
            }
            const subject = new Subject({
                teacherName: data.username,
                subjectName: data.subjectName,
                subjectCode,
                subjectLink: data.classLink,
                time: data.time,
                days: data.days,
                students: [],
                tasks: []
            });
            const user = await User.findOne({username: data.username});
            subject.save()
            .then((subject) => {
                user.subjects.push(subject);
                user.save();
                res.json(subject);
            })
            .catch((error) => {
                res.json(error);
            });
        }
    }
    catch(error) {
        res.json(next(error));
    }
}

const deleteSubject = async(req, res, next) => {
    try 
    {
        if (req.user === null) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else if (req.user.username !== req.params.username) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else {
            const subject = await Subject.findOne({_id: req.params.id});
            const user = await User.findOne({username: req.params.username});
            let subjectIndex = user.subjects.findIndex((id) => JSON.stringify(id) == JSON.stringify(subject._id)); 
            if (subjectIndex !== (-1)) {
                user.subjects.splice(subjectIndex, 1);
            }
            user.save();
            for (let student of subject.students) {
                const user = await User.findOne({_id: student});
                let subjectIndex = user.subjects.findIndex((id) => JSON.stringify(id) == JSON.stringify(subject._id)); 
                if (subjectIndex !== (-1)) {
                    user.subjects.splice(subjectIndex, 1);
                }
                user.save();
            }
            for (let taskId of subject.tasks) {
                await Task.deleteOne({_id: taskId});
            }
            await Subject.deleteOne({_id: req.params.id});
            res.json("DELETED");
        }
    }
    catch (error) {
        res.json(next(error));
    }
}

const removeStudentFromSubject = async(req, res, next) => {
    try 
    {
        console.log(req.user, req.body);
        if (req.user === null) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else if (req.user.username !== req.body.username) {
            res.status(401).json({Error: "You are not authenticated"});
        }
        else {
            const data = req.body;
            const user = await User.findOne({username: data.username});
            const subject = await Subject.findOne({_id: data.subjectId});
            let userIndex = subject.students.findIndex((id) => JSON.stringify(id) === JSON.stringify(user._id));
            let subjectIndex = user.subjects.findIndex((id) => JSON.stringify(id) == JSON.stringify(subject._id)); 
            if (userIndex !== (-1)) {
                subject.students.splice(userIndex, 1);
            }
            if (subjectIndex !== (-1)) {
                user.subjects.splice(subjectIndex, 1);
            }
            user.save()
            .then(() => {
                subject.save()
                .then((response) => {
                    res.json(response);
                })
                .catch((err) => {
                    res.json(err);
                });
            })
            .catch((err) => {
                res.json(err);
            });
        }
    }
    catch (error) {
        res.json(next(error));
    }
}

const getSubjectById = async(req, res, next) => {
    try 
    {
        const user = req.user;
        if(user === null) 
        {
            redis.deleteBySessionId(req.cookies.SESSIONID);
            res.clearCookie("SESSIONID");
            res.json("INVALID");
        }
        else 
        {
            let subject = await Subject.findOne({_id: req.params.subjectId});
            const tasks = await helper.getTasksFromTaskIds(subject.tasks);
            const students = await helper.getUsersfromUserIds(subject.students);
            res.json({
                subject,
                tasks,
                students,
                username: user.username,
                role: user.role
            });
        }
    }
    catch(error) 
    {
        res.json(next(error));
    }
}

module.exports = {
    addSubject,
    deleteSubject,
    removeStudentFromSubject,
    getSubjectById
}