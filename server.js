require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 5000;

// USING ALL MIDDLEWARES
app.use(cors());
app.use(express.json( {limit: "50mb"}));
app.use(cookieParser(process.env.COOKIE_SECRET));

// CONNECTING TO MONGODB ATLAS
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Mongodb cluster connected Successfully")
;})
.catch((error) => {
    console.log(error);
});

// IMPORTING ALL ROUTES
const userRouter = require("./routes/user.routes");
const subjectRouter = require("./routes/subject.routes");
const taskRouter = require("./routes/task.routes");
app.use("/users", userRouter);
app.use("/subjects", subjectRouter);
app.use("/tasks", taskRouter);

// HANDLING THE PRODUCTION BUILD FOR HEROKU
if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
};

// LISTENTING THE SERVER ON DEFINED PORT 
app.listen(PORT, () => {
    console.log(`Express server started on ${PORT}`);
});