import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import endpoints from "./src/routes/endpoints.js";
import swaggerSetup from "./swagger.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use("/api", endpoints);
app.use("/api-docs", swaggerSetup);

app.listen(8080, () => {
	console.log("Server running at http://localhost:8080");
});

export default app;
