import gridfsStream from 'gridfs-stream';
import mongoose from 'mongoose';

let gfs;

const connectGridFS = (connection) => {
  gfs = gridfsStream(connection.db, mongoose.mongo);
  gfs.collection('audio');
};

export { connectGridFS, gfs };

