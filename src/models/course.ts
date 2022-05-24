import { Schema } from 'mongoose';

const courseSchema = new Schema({
  courseId: {
    type: Number,
    auto: true
  },
  name: String,
  type: {
    type: String,
    enum: {
      values: ['Triennale', 'Magistrale', 'Master'] 
    }
  }
});

export default courseSchema;