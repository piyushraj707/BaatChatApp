import express from "express"
import authenticateToken from "../middlewares/authenticateToken.js";
import user from "../models/user.js";

const router = express.Router();

router.get("/", (req, res) => {
	console.log('friend API fired 1.')
})

router.get("/:friend", (req, res) => {
	console.log('friend API fired 2.')
	console.log(req.params.friend)
	user.findOne({username: req.params.friend})
		.then(() => {
			console.log(req.params.friend);
			res.status(200)
		})
		.catch(res.status(404));
	res.send(req.params.friend)
})

export default router;