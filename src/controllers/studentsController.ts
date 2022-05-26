import e, { Router } from 'express';
import Course, { CourseI } from '../models/course';
import Student, { StudentI } from '../models/student';

const studentsController = Router();

studentsController.get('/', (req, res) => {
  Student.find({}, (error: Error, data: Array<StudentI>) => {
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
  newStudent.save((error: Error, data: StudentI) => {
    if(error) {
      throw error;
    }else {
      res.redirect(`/students/${data._id}`);
    }
  });
});

studentsController.get('/addcourse', (req, res) => {
  Course.find({}, (error: Error, data: Array<CourseI>) => {
    if(error) {
      throw error;
    }else {
      res.render('student_add_course', { courses: data });
    }
  });
});

studentsController.post('/addcourse', (req, res) => {
  Student.findByIdAndUpdate({ _id: req.body.student_id }, {
    $push: {
      courses: req.body.course_id
    }
  }, (error: Error) => {
    if(error) {
      throw error;
    }else {
      res.redirect(`/students/${req.body.student_id}`);
    }
  });
});

studentsController.get('/:student_id', (req, res) => {
  Student.findById(req.params.student_id).populate('courses').exec((error, data) => {
    if(error) {
      throw error;
    }else {
      res.render('student', { student: data });
    }
  });
});

studentsController.delete('/:student_id', (req, res) => {
  Student.findOneAndDelete({ _id: req.params.student_id }, (error: Error) => {
    if(error) {
      throw error;
    }else {
      res.json({
        success: true
      });
    }
  });
});

export default studentsController;