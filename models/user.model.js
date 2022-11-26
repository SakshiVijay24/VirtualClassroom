const mongoose = require("mongoose");
const Subject = require("./subject.model");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            index: true
        },
        password: {
            type: String
        },
        role: {
            type: String,
            required: true
        },
        subjects: [
            {
                type: Schema.Types.ObjectId,
                ref: Subject
            }
        ],
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: Subject
            }
        ]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;