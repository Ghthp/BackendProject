import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});
import connectDB from "./db/db.js";
import app from "./app.js";

connectDB()
.then(() => {
    const PORT = process.env.PORT || 8000;
    
    app.listen(PORT, (req, res) => {  // run the server
        console.log(`Server running at ${PORT}`);
    });
})
.catch((error) => {
    console.log("MONGODB CONNECTION FAILED !!!");
});


