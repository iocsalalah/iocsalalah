import express from "express";
const membersRouter = express.Router();

//importing models
import memberModel from "../models/member.js";
import family_memberModel from "../models/family_member.js";
import member_codeModel from "../models/member_code.js";

async function getMember(req, res, next) {
  //middlewarefor all /:id get requests
  let member;
  try {
    member = await memberModel.findById(req.params.id); //customModel
    if (member == null) {
      return res.status(404).json({ message: "cannot find member" }); //404 couldnt fnd something return exits out of the function
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); //500 error on server
  }
  res.member = member;
  next();
}

membersRouter.get("/get-code", async (req, res) => {
  try {
    let member_code = await member_codeModel.findOne({ id: 19 });
    if (member_code) {
      res.json(member_code);
    }
    else {
      const newCode = new member_codeModel({
        code: 1001,
        id: 19,
      });
      const response = await newCode.save();
      res.json(response);

    }
  } catch (e) {
    console.log(e);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//creating one
membersRouter.post("/", async (req, res) => {
  try {
    const familyMemberdetails = [];
    const new_member = new memberModel(req.body);
    new_member.family_members = [];
    let member_code = await member_codeModel.findOne({ id: 19 });
    new_member.member_code = member_code.code;
    await member_codeModel.findOneAndUpdate(
      { id: 19 },
      { code: member_code.code + 1 }
    );
    //if we create a var and save the new member to it ,it will display the "family_members" field as it is in the payload (with all the details)
    for (const familyMemberData of req.body.family_members) {
      const familyMember = new family_memberModel(familyMemberData);
      await familyMember.save();
      new_member.family_members.push(familyMember._id);
      const familyMemberDetail = await family_memberModel.findById(
        familyMember._id
      );
      familyMemberdetails.push(familyMemberDetail);
    }
    const savedMember = await new_member.save();
    res.status(200).json({
      savedMember,
      familyMemberdetails,
    });
  } catch (err) {
    res.status(500).json({ message: err.message }); // Internal Server Error
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//getting all
membersRouter.get("/", async (req, res) => {
  try {
    if (req.query.branch) {
      const all_members_data = await memberModel
        .find({ branch: req.query.branch })
        .sort({ name: "asc" });
      res.json(all_members_data);
    } else {
      const all_members_data = await memberModel
        .find()
        .sort({ member_code: -1 });
      res.json(all_members_data); //filenameofcustommodelmodelname
    }
  } catch (err) {
    res.status(500).json({ messsage: err.message }); //to find the error in database,the error is not users fault
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//geting one
membersRouter.get("/:id", getMember, async (req, res) => {
  // Middleware gets activated;
  const familyMemberdetails = [];

  for (let i = 0; i < res.member.family_members.length; i++) {
    const familyMemberDetail = await family_memberModel.findOne({
      _id: res.member.family_members[i],
    });
    if (familyMemberDetail) {
      familyMemberdetails.push(familyMemberDetail);
    }
  }

  res.status(200).json({
    member: res.member, // Sending an object as the response
    familyMemberdetails: familyMemberdetails,
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//updating one
// PATCH route to update a member's information
membersRouter.patch("/:id", getMember, async (req, res) => {
  try {
    // Update member fields with values from req.body
    if (req.body.family_members) {
      // console.log(req.body.family_members);
      for (let i = 0; i < res.member.family_members.length; i++) {
        await family_memberModel.findByIdAndDelete(
          res.member.family_members[i]
        );
      }

      const family_members = [];
      for (let i = 0; i < req.body.family_members.length; i++) {
        const familyMember = new family_memberModel({
          family_member_name: req.body.family_members[i].family_member_name,
          relation: req.body.family_members[i].relation,
          family_member_DOB: req.body.family_members[i].family_member_DOB,
        });
        await familyMember.save();
        family_members.push(familyMember._id);
        // console.log(family_members);
      }

      req.body.family_members = family_members;
      // console.log(req.body.family_members);
    }

    Object.assign(res.member, req.body);

    // Save the updated member
    const updatedMember = await res.member.save();

    // Respond with the updated member data
    res.json({ updatedMember });
  } catch (err) {
    // Handle error if needed
    res.status(400).json({ message: err.message });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//deleting one
membersRouter.delete("/:id", async (req, res) => {
  try {
    //await res.member.remove(); // This line might be causing the error
    await memberModel.deleteOne({ _id: req.params.id }); //customModel
    res.json({ message: "Deleted member" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default membersRouter;