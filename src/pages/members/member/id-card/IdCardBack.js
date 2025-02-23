import React from "react";
import "./id-card.scss";
import idSide from "../../../../assets/id-card/id-side.png";
import idBack from "../../../../assets/id-card/id-back.png";
import idlogo from "../../../../assets/id-card/id-logo.png";
import { toDateView } from "../../../../services/toDateView";
//styles
import "./IdCardBack.scss";

export const IdCardBack = React.forwardRef((props, ref) => {
  console.log("\n\n")
  console.log("IdCardBack component is rendering...");
  console.log("Recieved props:");
  console.log(props);

  let { member, family } = props;


  if (!member) return;



  return (
    <div ref={ref} className="back-id">
      <div className="family-info">
        <h3 className="family-title">FAMILY MEMBERS</h3>
        {family.map((item) => {
          if (item)
            return (
              <p className="family-member-name">{item.family_member_name}</p>
            );
          else
            return null;
        })}
      </div>

      <div className="back-details">
        <p className="dob">DOB: {toDateView(member.DOB)}</p>
        <p className="blood">Blood: {member.blood_group}</p>
        <p className="phone">Phone: {member.WhatsApp_no}</p>
      </div>

      <div className="footer">
        <p className="email">Email: iocsalalah@gmail.com</p>
      </div>

      <div className="id-logo">
        <img src={idlogo} alt="" />
      </div>
      <div className="id-side">
        <img src={idSide} alt="" />
      </div>
      <div className="id-back">
        <img src={idBack} alt="" />
      </div>
    </div>
  );
});
