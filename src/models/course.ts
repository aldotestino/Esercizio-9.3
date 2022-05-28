import mongoose, { Schema } from 'mongoose';

interface CourseI {
  _id: string
  name: string
  type: 'Triennale' | 'Magistrale' | 'Master'
}

const courseSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  type: {
    type: String,
    enum: {
      values: ['Triennale', 'Magistrale', 'Master'] 
    }
  }
});

const CourseModel = mongoose.model<CourseI>('Course', courseSchema, 'course');

export default CourseModel;
export { CourseI };