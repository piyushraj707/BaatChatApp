import express from "express"
import authenticateToken from "../middlewares/authenticateToken.js"
import chatsDB from "../models/chats.js"

const router = express.Router();

router.get("/:friend", authenticateToken, async (req, res) => {
	//get all chats between user and "/:friend"
	try {
		const friend = req.params.friend;
		const me = req.userInfo.username;
		const result = await chatsDB.findOne({participants: [me, friend].sort()});
		if (!result) res.status(404).send("Chats not found.")
		res.status(200).send(result.messages);
	}
	catch {
		res.status(401);
	}
})

router.post("/", authenticateToken, async(req, res) => {
	try {
		const dataToSave = {
			author: req.userInfo.username,
			timestamp: new Date(),
			text: req.body.text
		}
		const participants =  [req.userInfo.username, req.body.friend].sort();
		const doesExist = await chatsDB.countDocuments({participants: participants});
		if (doesExist) {
			await chatsDB.findOneAndUpdate(
				{participants: participants},
				{$push: {messages: dataToSave}},
				{new: false, upsert: false}
			)
		}
		else {
			console.log("does not exist")
			const newEntry = new chatsDB({
				participants: participants,
				messages: [dataToSave]
			})
			newEntry.save()
				.then(() => {
					console.log("Message saved")
				})
			}
		res.status(200).send("Message saved");
	}
	catch {
		console.log("There was an error saving the msg");
	}
})

export default router;