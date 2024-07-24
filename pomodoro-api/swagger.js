import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

// Defina as opções do Swagger
const options = {
	definition: {
		openapi: "3.0.0", // Versão do OpenAPI (Swagger)
		info: {
			title: "API Example", // Nome da API
			version: "1.0.0", // Versão da API
			description: "Documentação da API usando Swagger", // Descrição da API
		},
	},
	servers: [
		{
			url: "http://localhost:8080/api", // URL da API
		},
	],
	// Caminho para os arquivos que contêm os comentários de Swagger
	apis: ["./src/routes/endpoints.js"], // Ajuste o caminho conforme a estrutura do seu projeto
};

// Crie o especificador Swagger
const swaggerSpec = swaggerJsdoc(options);

// Middleware do Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware do Swagger UI
const swaggerSetup = [swaggerUi.serve, swaggerUi.setup(swaggerSpec)];

export default swaggerSetup;
