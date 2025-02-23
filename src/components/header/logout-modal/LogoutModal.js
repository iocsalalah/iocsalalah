import React from "react";
import "./logout-modal.scss";
import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import ModalLayout from "../../../layout/modal-layout/ModalLayout";

export default function LogoutModal({ closeModal, show }) {
  const navigate = useNavigate();

  let onLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <ModalLayout closeModal={closeModal} show={show}>
      <div className="logout-modal">
        <div className="warning">Are you sure you want to logout?</div>
        <div className="delete-btn">
          <Button
            variant="contained"
            size="small"
            color="warning"
            style={{
              textTransform: "none",
              fontSize: "1rem",
            }}
            onClick={onLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
