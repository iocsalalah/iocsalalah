import React from "react";
import "./id-card.scss";
import { IdCardFront } from "./IdCardFront";
import { IdCardBack } from "./IdCardBack";

export default function IdCardContainer() {
  return (
    <div className="id-card-container">
      <IdCardFront />
      <IdCardBack />
    </div>
  );
}
