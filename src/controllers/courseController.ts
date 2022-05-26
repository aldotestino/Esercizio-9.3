import { Router } from 'express';
import Course, { CourseI } from '../models/course';

const courseController = Router();

courseController.get('/', (_, res) => {
  Course.find({}, (error: Error, data: Array<CourseI>) => {
    if(error) {
      throw error;
    }else {
      res.render('courses', { courses: data });
    }
  });
});

courseController.get('/add', (_, res) => {
  res.render('add_course');
});

courseController.post('/add', (req, res) => {
  const newCourse = new Course(req.body);
  newCourse.save((error: Error) => {
    if(error) {
      throw error;
    } else {
      res.redirect('/courses');
    }
  });
});

courseController.get('/:course_id', (req, res) => {
  Course.findById(req.params.course_id, (error: Error, data: CourseI) => {
    if(error) {
      throw error;
    }else {
      res.render('course', { course: data });
    }
  });
});

courseController.delete('/:course_id', (req, res) => {
  Course.findOneAndDelete({ _id: req.params.course_id }, (error: Error) => {
    if(error) {
      throw error;
    }else {
      res.json({
        success: true
      });
    }
  });
});

export default courseController;