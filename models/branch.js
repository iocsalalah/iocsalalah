import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  branch_name: {
    type: String,
    required: true,
  },

  creation_date: {
    type: Date,
    default: Date.now,
  },
});

const branchModel = mongoose.model("branchModel", branchSchema); //CustomModel=the name of the model
export default branchModel;