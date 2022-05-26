import mongoose, { Schema } from 'mongoose';
import { CourseI } from './course';

interface StudentI {
  _id: Schema.Types.ObjectId
  firstName: string
  lastName: string
  courses: Array<CourseI>
}

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

const Student = mongoose.model('Student', studentSchema, 'student');

export default Student;
export { StudentI };