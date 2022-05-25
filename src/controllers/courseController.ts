import { Router } from 'express';
import Course from '../models/course'

const courseController = Router();

courseController.get('/', (req, res) => {
  Course.find({}, (error: Error, data: any) => {
    if(error) {
      throw error;
    }else {
      console.log(data);
      res.render('courses', { courses: data });
    }
  });
});

courseController.get('/add', (req, res) => {
  res.render('add_course');
});

courseController.post('/add', (req, res) => {
  console.log(req.body);
  const newCourse = new Course(req.body);
  newCourse.save((error: Error, data: any) => {
    if(error) {
      throw error;
    } else {
      res.redirect('/courses');
    }
  });
});

export default courseController;