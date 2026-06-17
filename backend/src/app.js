// Role of this file
// Create server

const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require('cors');
const app =express();

app.use(cookieParser());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World")
})

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ["http://localhost:5173"];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal server error"
    });
});


module.exports = app;
