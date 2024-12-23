require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

const usersRoutes = require("./controller/users");
const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', usersRoutes);
const mongoUri = "MONGO_URI=mongodb+srv://ahmedayman26:SOAassignment1@assignment-1.gxws7.mongodb.net/";

//database connection
mongoose.connect(mongoUri)
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Database connection error:", err));

app.listen(3001, () => {
    console.log("server works")
}); 