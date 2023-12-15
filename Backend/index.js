import {config} from 'dotenv'; config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const port = 3002;

const app = express();
app.use(cors({origin: "http://localhost:3000"})) //allow communication between frontend and backend

//middleware for JSON
app.use(express.json())

//connecting to MongoDB using Mongoose
const DBPass = process.env.DB_PASS;
const mongoDBurl = "mongodb+srv://encrypto_2:"+DBPass+"@cluster0.o3s7dmp.mongodb.net/Authentication?retryWrites=true&w=majority"
mongoose
	.connect(mongoDBurl)
	.then(()=>{
		console.log("MongoDB connection established.");
	})
	.catch(()=> {
		console.log("Cannot connect to the database");
	})

//Connecting to different routes
import authRouter from "./routes/auth.js";
app.use("/", authRouter)

app.get("/", (req, res) => {
	res.send("<h1>Hello World. This is a backend server</h1>")
})

app.listen(port, () => {
	console.log('The server is running on', port);
})