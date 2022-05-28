import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import expressSession from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import courseController from './controllers/courseController';
import studentsController from './controllers/studentsController';
import { handleError, isLoggedIn } from './middlewares';

import User, { UserI } from './models/user';
import userController from './controllers/userController';

const PORT = 3000;
const app = express();

app.use(expressSession({
  secret: 'EEDB3ACC963D1F4D53CBAB639E975',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

type _User = UserI;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        // tslint:disable-next-line:no-padding no-empty-interface
        type User = _User
    }
}

passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard'); 
});

app.use('/user', userController);
app.use('/courses', isLoggedIn, courseController);
app.use('/students', isLoggedIn, studentsController);

app.use(handleError);

mongoose.connect('mongodb://localhost:27017/uni-db');

const db = mongoose.connection;

db.once('open', () => {
  console.log('db connected, starting server...');
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
});
