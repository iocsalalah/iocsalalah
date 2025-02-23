import "./modal-layout.scss";
import React from "react";

import CloseIcon from "@mui/icons-material/Close";

export default function ModalLayout({ closeModal, show, children }) {
  const showHideClassName = show
    ? "modal-layout display-block"
    : "modal-layout display-none";

  return (
    <div className={showHideClassName}>
      <div className="model-layout-main">
        <div className="close-icon">
          <CloseIcon
            style={{
              color: "darkred",
              fontSize: "1.75rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
            onClick={closeModal}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
