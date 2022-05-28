import { Router } from 'express';
import passport from 'passport';
import User from '../models/user';

const userController = Router();

userController.get('/register', (req, res) => {
  res.render('register');
});

userController.post('/register', (req, res) => {
  const { password, ...body } = req.body;
  const user = new User(body);

  User.register(user, password, (error: Error) => {
    if(error) {
      throw error;
    }else {
      res.redirect('/user/login');
    }
  });
});

userController.get('/login', (req, res) => {
  res.render('login');
});

userController.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/user/login'
}));

userController.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/user/login');
});

userController.get('/delete', (req, res) => {
  //const { _id }: UserI = req.user as UserI;
  
  User.findByIdAndDelete(req.user?._id, (error: Error) => {
    if(error) {
      throw error;
    }else {
      req.logout();
      res.redirect('/');
    }
  });

});

export default userController;