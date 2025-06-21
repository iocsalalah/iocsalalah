import React from "react";
import "./delete-branch-modal.scss";
import api from "../../../api";

import Button from "@mui/material/Button";
import ModalLayout from "../../../layout/modal-layout/ModalLayout";

export default function DeleteBranchModal({ closeModal, show, branch }) {
  const [submitBtn, setSubmitBtn] = React.useState(false);

  let onDelete = async (id) => {
    setSubmitBtn(true);
    await api.delete(`branches/${id}`);
    window.location.reload();
  };

  return (
    <ModalLayout closeModal={closeModal} show={show}>
      <div className="delete-branch-modal">
        <div className="warning">
          Are you sure you want to delete the branch {branch?.branch_name}?
        </div>
        <div className="delete-btn">
          <Button
            variant="contained"
            size="small"
            color="error"
            style={{
              textTransform: "none",
              fontSize: "1rem",
            }}
            onClick={() => onDelete(branch?._id)}
            disabled={submitBtn}
          >
            {submitBtn ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
