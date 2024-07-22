import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fisrtName: String,
  lastName: String,
  email: String,
  password: String,
  address: String,
  PhoneNumber: Number,
  birthDate: String,
});
const User = mongoose.model("user", UserSchema);

export default User;
