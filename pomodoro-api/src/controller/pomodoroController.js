import mongodb from "mongodb";
import mongoose from "mongoose";
import db from "../config/dbConnect.js";

let gfsBucket;
db.once("open", () => {
	const connection = mongoose.connection.db;
	gfsBucket = new mongodb.GridFSBucket(connection, {
		bucketName: "fs",
	});
});

class PomodoroController {
	static listAllFiles = async (req, res) => {
		try {
			let files = await db.collection("fs.files").find().toArray();
			res.json({ files });
		} catch (err) {
			console.error(err);
			res.json({ err });
		}
	};

	static downloadFile = async (req, res) => {
		try {
			const { filename } = req.params;

			if (!gfsBucket) {
				console.log("GridFS not initialized");
				return res.status(500).json({ err: "GridFS not initialized" });
			}

			const file = await db.collection("fs.files").findOne({ filename });
			if (!file) {
				return res.status(404).json({ err: "No file exists" });
			}

			const downloadStream = gfsBucket.openDownloadStream(file._id);
			downloadStream.on("error", (err) => {
				console.error("Error in download stream:", err);
				res.status(500).json({ err: "Error in download stream" });
			});
			res.setHeader("Content-Type", file.contentType);
			downloadStream.pipe(res);
		} catch (err) {
			console.error(err);
			res.status(500).json({ err: "Internal Server Error" });
		}
	};

	static uploadFile = (req, res) => {
		res.send({ message: "Successfully uploaded files" });
	};
}

export default PomodoroController;
