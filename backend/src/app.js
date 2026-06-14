// Role of this file
// Create server

const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const cors = require('cors');
const app =express();

app.use(cookieParser());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}));


app.use("/api/auth",authRoutes);

app.use("/api/food",foodRoutes);

module.exports = app;
