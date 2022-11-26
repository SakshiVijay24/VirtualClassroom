const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    studentName: {
        type: String,
        required: true
    },
    submissionLink: {
        type: String,
        required: true
    },
    subjectId: {
        type: String,
        required: true
    },
    marksObtained: {
        type: Number,
        required: true
    },
    taskId: {
        type: String,
        required: true
    }
});

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        type: {    
            type: String,
            required: true
        },
        subjectId: {
            type: String,
            required: true
        },
        creator: {
            type: String,
            required: true
        },
        submissions: [submissionSchema],
        deadline: {
            type: Number,
            required: true
        },
        duration: {
            type: Number
        },
        totalMarks: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;