import mongoose from "mongoose";

const member_codeSchema = new mongoose.Schema({
  code: {
    type: Number,
  },
  id: {
    type: Number,
    unique: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

const member_codeModel = mongoose.model("member_codeModel", member_codeSchema);
export default member_codeModel;