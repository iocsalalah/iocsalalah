import express from "express";
const branchRouter = express.Router();
//importring models
import branchModel from "../models/branch.js";

async function getBranch(req, res, next) {
  //middlewarefor all /:id get requests
  let branch;
  try {
    branch = await branchModel.findById(req.params.id); //customModel
    if (branch == null) {
      return res.status(404).json({ message: "cannot find branch" }); //404 couldnt fnd something return exits out of the function
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); //500 error on server
  }
  res.branch = branch;
  next();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//creating one
branchRouter.post("/", async (req, res) => {
  const branchObject = new branchModel({
    branch_name: req.body.branch_name,
  });
  try {
    const newBranchObject = await branchObject.save();
    res.status(201).json(newBranchObject); //201 success status
  } catch (err) {
    res.status(400).json({ message: err.message }); //userfault
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//getting all
branchRouter.get("/", async (req, res) => {
  try {
    const all_branch_data = await branchModel
      .find()
      .sort({ branch_name: "asc" });
    res.json(all_branch_data); //filenameofcustommodelmodelname
  } catch (err) {
    res.status(500).json({ messsage: err.message }); //to find the error in database,the error is not users fault
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//geting one
branchRouter.get("/:id", getBranch, (req, res) => {
  //middleware gets activated;
  res.json(res.branch);
});

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//updating one
branchRouter.patch("/:id", getBranch, async (req, res) => {
  if (req.body.branch_name != null) {
    //checks if request body contains name
    res.branch.branch_name = req.body.branch_name;
  }

  try {
    const updatebranch = await res.branch.save();

    res.json({
      updatebranch: updatebranch,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//deleting one
branchRouter.delete("/:id", async (req, res) => {
  try {
    //await res.member.remove(); // This line might be causing the error
    await branchModel.deleteOne({ _id: req.params.id }); //customModel
    res.json({ message: "Deleted branch" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default branchRouter;
