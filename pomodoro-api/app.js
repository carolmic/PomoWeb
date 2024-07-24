import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongodb from "mongodb";
import mongoose from "mongoose";
import db from "./src/config/dbConnect.js";
import endpoints from "./src/routes/endpoints.js";
import swaggerSetup from "./swagger.js";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use("/api", endpoints);
app.use("/api-docs", swaggerSetup);

let gfsBucket;
db.once("open", () => {
	const connection = mongoose.connection.db;
	gfsBucket = new mongodb.GridFSBucket(connection, {
		bucketName: "fs",
	});
});

app.listen(8080, () => {
	console.log("Server running at http://localhost:8080");
});

export default app;
