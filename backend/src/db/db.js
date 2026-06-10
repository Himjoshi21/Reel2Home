const mongoose = require("mongoose")


function connectDB(){
    mongoose.connect("mongodb://127.0.0.1:27017/food-view")
    .then(()=>{
        console.log("Mongodb connected");
    })
    .catch((err)=>{
        console.log("Mongodb connection error:",err);
    })
}
module.exports = connectDB;