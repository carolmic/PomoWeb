import express from "express";
import multer from "multer"; // Para upload de arquivos
import { GridFsStorage } from "multer-gridfs-storage";
import PomodoroController from "../controller/pomodoroController.js";


const storage = new GridFsStorage({
	url: process.env.MONGODB_URI,
	file: (req, file) => {
		return {
			filename: file.originalname,
		};
	},
});
const upload = multer({ storage });

const router = express.Router();

/**
 * @swagger
 * /api/files:
 *   get:
 *     summary: Retorna uma lista de arquivos
 *     description: Retorna uma lista de arquivos.
 *     responses:
 *       200:
 *         description: Lista de arquivos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   filename:
 *                     type: string
 *                   url:
 *                     type: string
 */
router.get("/files", PomodoroController.listAllFiles);

/**
 * @swagger
 * /api/download/{filename}:
 *   get:
 *     summary: Faz o download de um arquivo específico
 *     description: Faz o download do arquivo especificado pelo nome.
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do arquivo para download
 *     responses:
 *       200:
 *         description: Arquivo baixado com sucesso
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get("/download/:filename", PomodoroController.downloadFile);

/**
 * @swagger
 * /api/upload_files:
 *   post:
 *     summary: Faz o upload de um arquivo
 *     description: Faz o upload de um único arquivo.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Arquivo enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filename:
 *                   type: string
 *                 url:
 *                   type: string
 */
router.post(
	"/upload_files",
	upload.single("file"),
	PomodoroController.uploadFile
);

export default router;
