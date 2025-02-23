import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  member_code: { //member id
    type: String,
  },
  name: {
    type: String,
    // required: true,
  },
  DOB: {
    type: Date,
    // required: true, //requiredfield,otherwise errormessage to user
  },
  profession: {
    type: String,
    // required: true,
  },
  email_id: {
    type: String,
    // required: true,
  },
  photo: {
    type: String,
    // // required: true,
  },
  GSM_no: {
    type: String,
    // required: true,
  },
  WhatsApp_no: {
    type: String,
    // required: true,
  },
  blood_group: {
    type: String,
    // required: true,
  },
  family_status: {
    type: String,
    // required: true,
  },
  residential_area: {
    type: String,
    // required: true,
  },
  passport_no: {
    type: String,
    // required: true,
  },
  civil_id_no: {
    type: String,
    // required: true,
  },
  address_in_India: {
    type: String,
    // required: true,
  },
  tel_no: {
    type: String,
    // required: true,
  },
  is_family_residing_in_Oman: {
    type: Boolean,
    // required: true,
  },
  application_no: {
    type: String,
    // required: true,
  },
  received_on: {
    type: Date,
    // required: true,
  },
  submitted_by: {
    type: String,
    // required: true,
  },
  branch_india: {
    type: String,
    // required: true,
  },
  checked_by: {
    type: String,
    // required: true,
  },
  approved_by: {
    type: String,
    // required: true,
  },
  president: {
    type: String,
    // required: true,
  },
  secretary: {
    type: String,
    // required: true,
  },
  union: {
    type: String,
    // required: true,
  },
  district: {
    type: String,
    // required: true,
  },
  family_members: [{}],
  branch: {
    type: String,
    // required: true,
  },
  expiry: {
    type: Date,
    // required: true,
  },

  creation_date: {
    type: Date,
    default: Date.now,
  },
});

const memberModel = mongoose.model("memberModel", memberSchema); //CustomModel=the name of the model
export default memberModel;