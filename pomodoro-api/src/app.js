import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongodb from "mongodb";
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import db from "./config/dbConnect.js";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const storage = new GridFsStorage({
	url: process.env.MONGODB_URI,
	file: (req, file) => {
		return {
			filename: file.originalname,
		};
	},
});

let gfsBucket;
db.once("open", () => {
	const connection = mongoose.connection.db;
	gfsBucket = new mongodb.GridFSBucket(connection, {
		bucketName: "fs",
	});
});

const upload = multer({ storage });

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.post("/upload_files", upload.single("file"), (req, res) => {
	res.send({ message: "Successfully uploaded files" });
});

app.get("/files", async (req, res) => {
	try {
		let files = await db.collection("fs.files").find().toArray();
		res.json({ files });
	} catch (err) {
		console.error(err);
		res.json({ err });
	}
});

app.get("/download/:filename", async (req, res) => {
	try {
		const { filename } = req.params;

		if (!gfsBucket) {
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
});

app.listen(8080, () => {
	console.log("Server running at http://localhost:8080");
});

export default app;
