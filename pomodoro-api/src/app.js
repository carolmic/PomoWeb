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

// Configurar o GridFS Stream
gridfsStream.mongo = mongoose.mongo;
let gfs;

db.once('open', () => {
  gfs = gridfsStream(db.db, mongoose.mongo);
  gfs.collection('audio');
});

// Configurar o Multer Storage
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: 'audio', // Coleção onde os arquivos serão armazenados
      filename: `${Date.now()}_${file.originalname}`
    };
  }
});

const upload = multer({ storage });

// Rota para upload de arquivos de áudio
app.post('/upload', upload.single('file'), (req, res) => {
  res.status(201).send({ file: req.file });
});

// Rota para download de arquivos de áudio
app.get('/audio/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

export default app;
