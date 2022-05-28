import mongoose, { Schema } from 'mongoose';
import { CourseI } from './course';

interface StudentI {
  _id: string
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

const StudentModel = mongoose.model<StudentI>('Student', studentSchema, 'student');

export default StudentModel;
export { StudentI };