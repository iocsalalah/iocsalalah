import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

// Hash the password before saving it to the database
adminSchema.pre("save", async function (next) {
  const admin = this;
  //if block executes if there is any modification on the password field (here it is hashedPassword) otherwise it  exits out of the middleware using next()
  if (!admin.isModified("hashedPassword")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(admin.hashedPassword, salt);
    admin.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const adminModel = mongoose.model("adminModel", adminSchema); //CustomModel=the name of the model
export default adminModel;