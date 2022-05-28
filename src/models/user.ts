import mongoose, { Document, PassportLocalDocument, PassportLocalModel, PassportLocalSchema, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

interface UserI extends PassportLocalDocument {
  _id: string
  firstName: string
  lastName: string
  email: string
}

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

type UserModel<T extends Document> = PassportLocalModel<T>

const UserModel: UserModel<UserI> =  mongoose.model<UserI>('User', userSchema, 'user');

export default UserModel;
export { UserI };