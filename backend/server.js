// to start server this file is used. It imports the app and listens on a specified port.
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

