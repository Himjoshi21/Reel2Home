// to start server this file is used. It imports the app and listens on a specified port.
const express = require('express');
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
connectDB();
app.use(express.json());
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

