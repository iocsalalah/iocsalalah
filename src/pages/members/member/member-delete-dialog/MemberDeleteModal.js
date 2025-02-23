import React from "react";
import "./member-delete-modal.scss";
import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import ModalLayout from "../../../../layout/modal-layout/ModalLayout";
import api from "../../../../api";

export default function MemberDeleteModal({ closeModal, show, member }) {
  const navigate = useNavigate();
  const [submitBtn, setSubmitBtn] = React.useState(false);

  let onDelete = async (id) => {
    setSubmitBtn(true);
    try {
      if (member.photo && member.photo.includes("http")) {
        await api.post("file/delete", { url: member.photo });
      }
      await api.delete(`members/${id}`);
      navigate("/members");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalLayout closeModal={closeModal} show={show}>
      <div className="delete-branch-modal">
        <div className="warning">
          Are you sure you want to delete the member {member?.name}?
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
            onClick={() => onDelete(member?._id)}
          >
            {submitBtn ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
