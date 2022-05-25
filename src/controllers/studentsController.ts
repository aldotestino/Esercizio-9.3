import { Router } from 'express';
import Course from '../models/course';
import Student from '../models/student';

const studentsController = Router();

studentsController.get('/', (req, res) => {
  Student.find({}, (error: Error, data: any) => {
    if(error) {
      throw error;
    }else {
      res.render('students', { students: data });
    }
  });
});

studentsController.get('/add', (req, res) => {
  res.render('add_student');
});

studentsController.post('/add', (req, res) => {
  const newStudent = new Student(req.body);
  newStudent.save((error: Error, data: any) => {
    if(error) {
      throw error;
    }else {
      res.redirect('/students');
    }
  });
});

studentsController.get('/addcourse', (req, res) => {
  Course.find({}, (error: Error, data: any) => {
    if(error) {
      throw error;
    }else {
      console.log(data);
      res.render('student_add_course', { courses: data });
    }
  });
});

studentsController.post('/addcourse', (req, res) => {
  console.log(req.body);
  res.send("corso aggiunto...");
});

export default studentsController;