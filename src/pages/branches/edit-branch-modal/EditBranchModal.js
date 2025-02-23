import React, { useState } from "react";
import "./edit-branch-modal.scss";
import ModalLayout from "../../../layout/modal-layout/ModalLayout";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../../../api";
import { useEffect } from "react";

export default function EditBranchModal({ show, closeModal, branch }) {
  const [submitBtn, setSubmitBtn] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(branch);
  }, [branch]);

  let onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let onFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn(true);
    await api.patch(`branches/${branch._id}`, { ...formData });
    window.location.reload();
  };

  return (
    <ModalLayout show={show} closeModal={closeModal}>
      <div className="edit-branch-modal">
        <h3 className="title">Edit branch</h3>
        <form onSubmit={onFormSubmit}>
          <div className="input-field">
            <TextField
              id="outlined-basic"
              label="branch"
              variant="outlined"
              size="small"
              name="branch_name"
              value={formData?.branch_name}
              required
              fullWidth
              onChange={onInputChange}
            />
          </div>
          <div className="submit-btn">
            <Button
              variant="contained"
              fullWidth
              style={{ textTransform: "none", fontSize: "1rem" }}
              type="submit"
            >
              {submitBtn ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
}
