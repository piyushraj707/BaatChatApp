import express from "express"
import authenticateToken from "../middlewares/authenticateToken.js";
import user from "../models/user.js";

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
	console.log('friend API fired 1.')
})

router.get("/:friend", authenticateToken, (req, res) => {
	const friend = req.params.friend;
	const me = req.userInfo.username
	user.findOne({username: friend})
		.then((friendInfo) => {
			if (!friendInfo) {
				res.status(404).send(new Error("No user with this username found."))
			}
			else {
				if (friend !== me) res.status(200).json({
					name: friendInfo.name,
					username: friendInfo.username
				})
				else res.status(400).send("Cannot talk to yourself.")
			}
		})
		.catch((err) => {
			res.status(401).send("Friend not found")
		})
})

export default router;