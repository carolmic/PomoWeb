import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
	console.error("A variável MONGODB_URI não está definida no arquivo .env");
	process.exit(1);
}

mongoose
	.connect(uri)
	.then(() => console.log("MongoDB connected..."))
	.catch((err) => console.log("Erro de conexão", err));

const db = mongoose.connection;

export default db;
