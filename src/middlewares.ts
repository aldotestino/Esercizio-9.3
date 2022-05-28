import { NextFunction, Request, Response } from 'express';

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if(req.isAuthenticated()) {
    return next();
  }else {
    res.redirect('/user/login');
  }
}

function handleError(error: Error, req: Request, res: Response, next: NextFunction) {
  res.json(error);
}

export { isLoggedIn, handleError };