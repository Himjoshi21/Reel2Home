// to start server this file is used. It imports the app and listens on a specified port.

const app = require("./src/app");

 
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

