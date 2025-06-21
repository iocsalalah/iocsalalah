import React from "react";
import "./id-card.scss";
import idSide from "../../../../assets/id-card/id-side.png";
import idBottom from "../../../../assets/id-card/id-bottom.png";
import idlogo from "../../../../assets/id-card/id-logo.png";
import userIcon from "../../../../assets/user.png";
import { toDateView } from "../../../../services/toDateView.js";


export const IdCardFront = React.forwardRef((props, ref) => {
  let { member } = props;

  if (!member) return;

  return (
    <div ref={ref} className="front-id">
      <div className="title">
        <h2>IOC Salalah, OMAN</h2>
        <h2>SALALAH UNION</h2>
      </div>

      <div className="bar"></div>

      <div className="photo">
        {member.photo && member.photo.includes("http") ? (
          <img src={`data:image/jpeg;base64,${props.img}`} alt="User" />
        ) : (
          <img src={userIcon} alt="User" />
        )}
      </div>

      <div className="front-info">
        <p className="name">{member.name}</p>
        <p className="branch">{member.branch}</p>
        <p className="id">ID No: {member.member_code}</p>
      </div>

      <div className="footer">
        <p className="expiry-date">Valid Upto {toDateView(member.expiry)}</p>
      </div>

      <div className="id-logo">
        <img src={idlogo} alt="" />
      </div>
      <div className="id-side">
        <img src={idSide} alt="" />
      </div>
      <div className="id-bottom">
        <img src={idBottom} alt="" />
      </div>
    </div>
  );
});
