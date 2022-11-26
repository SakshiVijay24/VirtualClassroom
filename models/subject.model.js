const mongoose = require("mongoose");
const Task = require("./task.model");
const User = require("./user.model");
const { Schema } = mongoose

const subjectSchema = new Schema(
    {
        teacherName: {
            type: String,
            required: true
        },
        subjectName: {
            type: String,
            required: true
        },
        days: [String],
        time: {
            type: String,
            required: true
        },
        subjectCode: {
            type: String,
            required: true
        },
        subjectLink: {
            type: String
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: User
            }
        ],
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: Task
            }
        ]
    },
    {
        timestamps: true
    }
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;