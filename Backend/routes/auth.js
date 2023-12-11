import express from "express"
import User from "../models/user.js"
const router = express.Router();

router.post("/signup", (req, res) => {
	console.log("post request at /signup (707)");
	User.findOne({username: req.body.username})
		.then((userFound) => {
			if (userFound) {
				res.status(409).send("Username already taken (707)."); //conflict status code
			}
			else {
				const user = new User({
					username: req.body.username,
					password: req.body.password,
					name: req.body.name,
					email: req.body.email
				})
				user.save()
					.then(()=> {
						res.status(200).send("User registered successfully (707");
					})
					.catch((err)=> {
						res.status(500).send("Something went wrong (707"); //Internal server error
						console.log(err);
					})
			}
		})
})

router.post("/login", (req, res)=> {
	console.log("post request at /login")
	User.findOne({username: req.body.username})
		.then((userFound)=> {
			if (!userFound)
				res.status(404).send("User not found. Please register (707).");
			else if (userFound.password !== req.body.password)
				res.status(401);
			else
				res.status(200).send("log in credentials correct (707");
		})
		.catch((err) => {
			console.log("Something went wrong (707");
			console.log(err)
			res.status(500)
		}) 
})

export default router