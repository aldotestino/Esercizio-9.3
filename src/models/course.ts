import mongoose, { Schema } from 'mongoose';

interface CourseI {
  _id: Schema.Types.ObjectId
  name: string,
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

const Course = mongoose.model('Course', courseSchema, 'course');

export default Course;
export { CourseI };