import express from "express";
import { connectDB } from "./01-config/connectDb.js";
import requestIp from "request-ip"
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./04-routes/01-user.js";

const app=express();

app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}))

app.use(express.json());
app.use(requestIp.mw());





async function startServer() {
    await connectDB();

    app.use("/api/auth",userRouter);


    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })
};


startServer();
