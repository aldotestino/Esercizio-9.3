import express from 'express';
import { join } from 'path';
import mongoose from 'mongoose';
import courseController from './controllers/courseController';
import studentsController from './controllers/studentsController';

console.log(__dirname);

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/courses', courseController);
app.use('/students', studentsController);

mongoose.connect('mongodb://localhost:27017/uni-db');

const db = mongoose.connection;

db.once('open', () => {
  console.log('db connected, starting server...');
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
});
