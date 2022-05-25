import mongoose, {Schema} from "mongoose";

const courseSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: {
      values: ['Triennale', 'Magistrale', 'Master'] 
    }
  }
});

const Course = mongoose.model('Course', courseSchema);

export default Course