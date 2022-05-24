import { Router } from 'express';
import mongoose from 'mongoose';
import courseSchema from '../models/course';

const Course = mongoose.model('Course', courseSchema);

const courseController = Router();

courseController.get('/', (req, res) => {
  Course.find({}, (error: any, data: any) => {
    if(error) {
      console.error(error.message);
      res.render('courses', { error: error.message });
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
  const newCourse = new Course(req.body);
  newCourse.save((error: any, data: any) => {
    if(error) {
      console.log(error);
      res.writeHead(500);
    } else {
      res.redirect('/courses');
    }
  });
});

export default courseController;