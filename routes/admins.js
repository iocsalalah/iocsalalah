import express from "express";
const adminsRouter = express.Router();

//importing models
import adminModel from "../models/admin.js";
//middlewarefor all /:id get requests
async function getadmin(req, res, next) {
  let admin;
  try {
    admin = await adminModel.findById(req.params.id); //customModel
    if (admin == null) {
      return res.status(404).json({ message: "cannot find admin" }); //404 couldnt fnd something return exits out of the function
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); //500 error on server
  }
  res.admin = admin;
  next();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//creating one
adminsRouter.post("/", async (req, res) => {
  try {
    const adminData = new adminModel(req.body);
    // console.log("Received Admin Data:", adminData);
    await adminData.save();
    res.json(adminData);
  } catch (err) {
    res.status(500).json({ message: err.message }); // Internal Server Error
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//async getting all
adminsRouter.get("/", async (req, res) => {
  try {
    const all_admins_data = await adminModel.find();
    res.json(all_admins_data); //filenameofcustommodelmodelname
  } catch (err) {
    res.status(500).json({ messsage: err.message }); //to find the error in database,the error is not users fault
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//geting one
adminsRouter.get("/:id", getadmin, (req, res) => {
  //middleware gets activated;
  res.json(res.admin);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//updating one
adminsRouter.patch("/:id", getadmin, async (req, res) => {
  if (req.body.password != null) {
    //checks if request body contains name
    res.admin.hashedPassword = req.body.password;
  }
  if (req.body.username != null) {
    //checks if request body contains name
    res.admin.username = req.body.username;
  }

  try {
    updatedAdmin = await res.admin.save();
    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//deleting one
adminsRouter.delete("/:id", async (req, res) => {
  try {
    //await res.member.remove(); // This line might be causing the error
    await adminModel.deleteOne({ _id: req.params.id }); //customModel
    res.json({ message: "Deleted admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default adminsRouter;
