const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

const usersRoutes = require("./controller/users");
<<<<<<< HEAD

=======
const sprintRoutes = require("./controller/sprints"); // Import sprints route
>>>>>>> 7634272cfdb68096b59d12a02d294d47b2b17800

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use('/users', usersRoutes);
<<<<<<< HEAD

=======
app.use("/api/sprints", sprintRoutes); // Register sprints route
>>>>>>> 7634272cfdb68096b59d12a02d294d47b2b17800

const mongoUri = "mongodb+srv://ahmedayman26:221341@spm.68rqu.mongodb.net/spm?retryWrites=true&w=majority";

// Database connection
mongoose.connect(mongoUri)
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Database connection error:", err));

app.listen(3001, () => {
<<<<<<< HEAD
    console.log("server works")
});
=======
    console.log("server works")
});
>>>>>>> 7634272cfdb68096b59d12a02d294d47b2b17800
