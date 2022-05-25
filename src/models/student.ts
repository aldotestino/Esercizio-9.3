import mongoose, { Schema } from 'mongoose';

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  courses: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;