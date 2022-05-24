import { Schema } from 'mongoose';

class BirthDate {
  day: number;
  month: number;
  year: number;

  constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
  }
}

const studentSchema = new Schema({
  studentId: Number,
  firstName: String,
  lastName: String,
  birthDate: BirthDate,
  courses: [String]
});

export default studentSchema;