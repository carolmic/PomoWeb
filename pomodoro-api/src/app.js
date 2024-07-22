import dotenv from 'dotenv';
import express from 'express';
import gridfsStream from 'gridfs-stream';
import mongoose from 'mongoose';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import db from './config/dbConnect.js';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return {
      filename: file.originalname
    };
  }
});

// Configurar o GridFS Stream
gridfsStream.mongo = mongoose.mongo;
let gfs;

db.once('open', () => {
  gfs = gridfsStream(db.db, mongoose.mongo);
  gfs.collection('audio');
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload_files', upload.single('file'), (req, res) => {
  res.send({ message: 'Successfully uploaded files' })
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

export default app;
