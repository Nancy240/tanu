import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./db.js";
import { router as captainRoutes } from "./routes/captain.routes.js";

const app = express();

connectToDB();

// app.use(cors({
//     origin: "http://localhost:5174",
//     credentials: true
// }))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/captain', captainRoutes);

app.get('/', (req, res)=>{
    res.send("Hello")
})

export {app}