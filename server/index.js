const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const sprintbacklogRoutes = require("./controller/sprintbacklog");
const usersRoutes = require("./controller/users");
const sprintRoutes = require("./controller/sprints");
const tasksRoutes = require("./controller/tasks");
const backlogRoutes = require("./controller/backlog");
const projectsRoutes = require("./controller/project");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use('/users', usersRoutes);
app.use("/sprints", sprintRoutes); 
app.use('/tasks', tasksRoutes);
app.use('/backlog', backlogRoutes);
app.use('/sprintbacklog', sprintbacklogRoutes);
app.use('/projects', projectsRoutes);

const mongoUri = "mongodb+srv://ahmedayman26:221341@spm.68rqu.mongodb.net/spm?retryWrites=true&w=majority";
// Database connection
mongoose.connect(mongoUri)
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Database connection error:", err));

app.listen(3001, () => {
    console.log("server works")
});
