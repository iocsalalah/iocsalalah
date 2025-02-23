//imports...
import cors from 'cors';
import { dirname } from 'path';
import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import path from 'path';
import upload from 'express-fileupload'
//routers
import membersRouter from "./routes/members.js";
import adminsRouter from "./routes/admins.js";
import branchRouter from "./routes/branches.js";
import loginRouter from "./routes/login.js";
import fileRouter from "./routes/file.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(upload());

//using the routers
app.use("/api/members", membersRouter);
app.use("/api/admins", adminsRouter);
app.use("/api/branches", branchRouter);
app.use("/api/login", loginRouter);
app.use("/api/file", fileRouter);


//serving index.html for get request to non existing routes
app.get("*", function (res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));
mongoose.connect(process.env.DATABASE_URL);

//starting the server
const renderPort = process.env.PORT;
const localPort = 5000;
app.listen(renderPort || localPort, () => {
    if (renderPort)
        console.log(`Server started at https://iocsalalah.onrender.com/ \nPort: ${renderPort}`);
    else
        console.log(`Server started at http://localhost:${localPort}/`);

})