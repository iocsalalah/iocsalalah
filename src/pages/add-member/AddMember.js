import React, { useState, useEffect } from "react";
import "./add-member.scss";

import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Button from "@mui/material/Button";
import api from "../../api";

export default function AddMember() {
  useEffect(() => {
    fetchBranches();
    fetchCode();
  }, []);

  const [branches, setBranches] = React.useState([]);
  const [code, setCode] = React.useState();
  const [file, setFile] = useState(null);

  let fetchBranches = async () => {
    let { data } = await api.get("branches");
    setBranches(data);
  };

  let fetchCode = async () => {
    let { data } = await api.get("members/get-code");
    setCode(data.code);
  };

  const [familyMembersCount, setFamilyMembersCount] = useState(0);

  const [familyFormData, setFamilyFormData] = useState([]);

  const handleFamilyChange = (index, event) => {
    const { name, value } = event.target;
    const newFormData = [...familyFormData];
    newFormData[index][name] = value;
    setFamilyFormData(newFormData);
  };

  const addFamilyMember = () => {
    setFamilyMembersCount(familyMembersCount + 1);
    setFamilyFormData([
      ...familyFormData,
      { family_member_name: "", relation: "", family_member_DOB: "" },
    ]);
  };

  const removeFamilyMember = () => {
    if (familyMembersCount === 0) return;
    const newFormData = [...familyFormData];
    newFormData.splice(familyMembersCount - 1, 1);
    setFamilyFormData(newFormData);
    setFamilyMembersCount(familyMembersCount - 1);
  };

  let [formData, setFormData] = useState({});
  const [submitBtn, setSubmitBtn] = useState(0);
  let onInputChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let onFormSubmit = async (e) => {
    console.log("\n\n");
    console.log("onFormSubmit function is running...");
    console.log("Received 1 parameter");
    console.log("1.Event:");
    console.log(e);

    e.preventDefault();
    if (file) {
      console.log("file exists")
      const maxSizeMB = 1;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      // console.log(file.size);
      if (file.size > maxSizeBytes) {
        console.log("function returned due to invalid file size")
        console.log("\n\n");
        window.alert(`Error: Photo size exceeds ${maxSizeMB} MB`);
        return;
      }
      if (/\s/.test(file.name)) {
        console.log("function returned due to file name containing whitespace")
        window.alert(`Error: Photo name contains whitespace `);
        return;
      }
    }

    setSubmitBtn(1);
    try {
      if (file) {
        const imgFormData = new FormData();
        imgFormData.append("file", file);
        console.log("a post request is send to members/file/upload");
        console.log("with the following data:");
        console.log("FormData entries:");
        for (let pair of imgFormData.entries()) {
          console.log(pair[0], pair[1]);
        }
        const { data } = await api.post("file/upload", imgFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // console.log(res);
        await api.post("members", {
          ...formData,
          family_members: familyFormData,
          photo: data.location,
        });
      } else {
        await api.post("members", {
          ...formData,
          family_members: familyFormData,
        });
      }
    } catch (e) {
      console.log(e);
    }
    console.log("function end...")
    console.log("\n\n");
    window.alert("Member Added Successfully");
    window.location.reload();
  };

  const handleFileChange = (e) => {
    console.log("\n\n");
    console.log("handleFileChange function is running...");
    console.log("Received 1 parameter");
    console.log("1.Event:");
    console.log(e);

    const file = e.target.files[0];
    // Changing file state
    console.log("file is set as:")
    console.log(file);
    console.log("function end...")
    console.log("\n\n");
    setFile(file);
  };

  return (
    <form className="AddMember" onSubmit={onFormSubmit}>
      <div className="add-member">
        <h2>
          Add Member
          {/* <span className="application-no">{generateApplicationNo()}</span> */}
        </h2>
        <div className="form">
          <div className="left">
            <TextField
              id="outlined-basic"
              label="Member ID"
              variant="outlined"
              size="small"
              fullWidth
              required
              name="code"
              inputProps={{ readOnly: true }}
              value={code}
              InputLabelProps={{
                shrink: true,
              }}
            // onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Profession"
              variant="outlined"
              size="small"
              fullWidth
              required
              name="profession"
              onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Whatsapp No"
              variant="outlined"
              size="small"
              fullWidth
              required
              name="WhatsApp_no"
              onChange={onInputChange}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">
                Marital Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Marital Status"
                required
                name="family_status"
                onChange={onInputChange}
              >
                <MenuItem value={"Married"}>Married</MenuItem>
                <MenuItem value={"Single"}>Single</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Residentail Area"
              variant="outlined"
              size="small"
              fullWidth
              required
              name="residential_area"
              onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Civil ID No"
              variant="outlined"
              size="small"
              fullWidth
              required
              name="civil_id_no"
              onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Photo"
              variant="outlined"
              size="small"
              type="file"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              // required
              name="photo"
              onChange={handleFileChange}
            />
            <TextField
              id="outlined-basic"
              label="Address In India"
              multiline={true}
              rows={2}
              variant="outlined"
              size="small"
              fullWidth
              required
              name="address_in_India"
              onChange={onInputChange}
            />
          </div>
          <div className="right">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
              fullWidth
              required
              name="name"
              onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="DOB"
              variant="outlined"
              size="small"
              type="Date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
              name="DOB"
              onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="GSM No"
              variant="outlined"
              size="small"
              fullWidth
              required
              name="GSM_no"
              onChange={onInputChange}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label-2">
                Blood Group
              </InputLabel>
              <Select
                labelId="demo-simple-select-labe-2"
                label="Blood Group"
                required
                name="blood_group"
                onChange={onInputChange}
              >
                <MenuItem value={"A+"}>A+</MenuItem>
                <MenuItem value={"B+"}>B+</MenuItem>
                <MenuItem value={"AB+"}>AB+</MenuItem>
                <MenuItem value={"A-"}>A-</MenuItem>
                <MenuItem value={"B-"}>B-</MenuItem>
                <MenuItem value={"AB-"}>AB-</MenuItem>
                <MenuItem value={"O+"}>O+</MenuItem>
                <MenuItem value={"O-"}>O-</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              type="email"
              fullWidth
              // required
              name="email_id"
              onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Passport No"
              variant="outlined"
              size="small"
              fullWidth
              required
              name="passport_no"
              onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Telephone No(India)"
              variant="outlined"
              size="small"
              fullWidth
              // required
              name="tel_no"
              onChange={onInputChange}
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Family residing in Oman
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                required
                name="is_family_residing_in_Oman"
                onChange={onInputChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio size="normal" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio size="normal" />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <p className="ioc-unit">India Unit Details:</p>
        <div className="form">
          <div className="left">
            <TextField
              id="outlined-basic"
              label="branch"
              variant="outlined"
              size="small"
              fullWidth
              // required
              name="branch_india"
              onChange={onInputChange}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="District"
                required
                name="district"
                onChange={onInputChange}
              >
                <MenuItem value={"Alappuzha"}>Alappuzha</MenuItem>
                <MenuItem value={"Ernakulam"}>Ernakulam</MenuItem>
                <MenuItem value={"Idukki"}>Idukki</MenuItem>
                <MenuItem value={"Kannur"}>Kannur</MenuItem>
                <MenuItem value={"Kasaragod"}>Kasaragod</MenuItem>
                <MenuItem value={"Kollam"}>Kollam</MenuItem>
                <MenuItem value={"Kottayam"}>Kottayam</MenuItem>
                <MenuItem value={"Kozhikode"}>Kozhikode</MenuItem>
                <MenuItem value={"Malappuram"}>Malappuram</MenuItem>
                <MenuItem value={"Palakkad"}>Palakkad</MenuItem>
                <MenuItem value={"Pathanamthitta"}>Pathanamthitta</MenuItem>
                <MenuItem value={"Thiruvananthapuram"}>
                  Thiruvananthapuram
                </MenuItem>
                <MenuItem value={"Thrissur"}>Thrissur</MenuItem>
                <MenuItem value={"Wayanad"}>Wayanad</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="right">
            <TextField
              id="outlined-basic"
              label="Union"
              variant="outlined"
              size="small"
              fullWidth
              // required
              name="union"
              onChange={onInputChange}
            />
          </div>
        </div>

        <p className="add-family">Add Family Members:</p>
        <div className="form-family">
          {[...Array(familyMembersCount)].map((item, index) => {
            return (
              <div className="row" key={index}>
                <div className="item">
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    name="family_member_name"
                    onChange={(e) => handleFamilyChange(index, e)}
                  />
                </div>
                <div className="item">
                  {/* <TextField
                    id="outlined-basic"
                    label="Relation"
                    variant="outlined"
                    size="small"
                    fullWidth
                    // required
                    name="relation"
                    onChange={(e) => handleFamilyChange(index, e)}
                  /> */}
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Relation
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label="Relation"
                      // required
                      name="relation"
                      onChange={(e) => handleFamilyChange(index, e)}
                    >
                      <MenuItem value={"Son"}>Son</MenuItem>
                      <MenuItem value={"Daughter"}>Daughter</MenuItem>
                      <MenuItem value={"Spouse"}>Spouse</MenuItem>
                      <MenuItem value={"Father"}>Father</MenuItem>
                      <MenuItem value={"Mother"}>Mother</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="item">
                  <TextField
                    id="outlined-basic"
                    label="DOB"
                    variant="outlined"
                    size="small"
                    fullWidth
                    // required
                    name="family_member_DOB"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => handleFamilyChange(index, e)}
                  />
                </div>
              </div>
            );
          })}
          <div className="action-icons">
            <div className="add-icon">
              <PersonAddAlt1Icon
                style={{
                  color: "darkgreen",
                  cursor: "pointer",
                  fontSize: "2rem",
                }}
                onClick={addFamilyMember}
              />
            </div>
            <div className="remove-icon">
              <PersonRemoveIcon
                style={{
                  color: "darkred",
                  cursor: "pointer",
                  fontSize: "2rem",
                }}
                onClick={removeFamilyMember}
              />
            </div>
          </div>
        </div>

        <p className="office-use">For Office Use:</p>
        <div className="form">
          <div className="left">
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Branch</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="branch"
                required
                name="branch"
                onChange={onInputChange}
              >
                {branches.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.branch_name}>
                      {item.branch_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Recieved on"
              type="date"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
              name="received_on"
              onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Checked By"
              variant="outlined"
              size="small"
              fullWidth
              required
              name="checked_by"
              onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Application No"
              variant="outlined"
              size="small"
              fullWidth
              required
              name="application_no"
              onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="President"
              variant="outlined"
              size="small"
              fullWidth
              // required
              name="president"
              onChange={onInputChange}
            />
          </div>
          <div className="right">
            <TextField
              id="outlined-basic"
              label="Submitted By"
              variant="outlined"
              size="small"
              fullWidth
              required
              name="submitted_by"
              onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Approved By"
              variant="outlined"
              size="small"
              fullWidth
              required
              name="approved_by"
              onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Expiry"
              variant="outlined"
              size="small"
              fullWidth
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              required
              name="expiry"
              onChange={onInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Secretary"
              variant="outlined"
              size="small"
              fullWidth
              // required
              name="secretary"
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="submit-btn">
          <Button
            variant="contained"
            fullWidth
            style={{ textTransform: "none", fontSize: "1rem" }}
            type="submit"
          >
            {submitBtn ? "Adding..." : "Add Member"}
          </Button>
        </div>
      </div>
    </form>
  );
}
