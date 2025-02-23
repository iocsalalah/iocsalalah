import React, { Fragment, useRef, useState, useEffect } from "react";
import "./member.scss";
import { useNavigate, useParams } from "react-router";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";
import MemberDeleteModal from "./member-delete-dialog/MemberDeleteModal";
import { IdCardFront } from "./id-card/IdCardFront.js";
import api from "../../../api";
import { toDateView } from "../../../services/toDateView";
import userIcon from "../../../assets/user.png";
import { IdCardBack } from "./id-card/IdCardBack.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import extractFilenameFromUrl from "../../../services/getFileNameFromUrl.js";

export default function Member() {
  const { id } = useParams();

  useEffect(() => {
    let fetchMember = async () => {
      let { data } = await api.get("members/" + id);
      setMember(data.member);
      setFamily(data.familyMemberdetails);

      let photo;
      if (data.member.photo && data.member.photo.includes("http")) {
        photo = extractFilenameFromUrl(data.member.photo);
      } else {
        return;
      }

      try {
        // Fetch the image from S3
        const { data } = await api.get("file/photo/" + photo);
        setImg(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMember();
  }, [id]);

  const [member, setMember] = React.useState({});
  const [family, setFamily] = React.useState([]);
  const [img, setImg] = React.useState(null);



  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#423f3f",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  let [deleteModal, setDeleteModal] = useState(false);

  const navigate = useNavigate();

  const componentRef = useRef();
  const componentRef2 = useRef();

  const handlePrint = async () => {
    let pdf;
    const input = componentRef.current;
    const inputRect = input.getBoundingClientRect(); // Get the bounding rect of the component
    html2canvas(input, {
      useCORS: true,
      allowTaint: true,
      width: inputRect.width,
      height: inputRect.height,
      windowWidth: inputRect.width,
      windowHeight: inputRect.height,
      scale: 5,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf = new jsPDF({
        unit: "px",
        format: [inputRect.width, inputRect.height], // Use component dimensions for PDF format
      });
      pdf.addImage(imgData, "PNG", 0, 0, inputRect.width, inputRect.height); // Ensure entire canvas is added
      // pdf.save(member.member_code + "-front.pdf");
    });

    const input2 = componentRef2.current;
    const inputRect2 = input2.getBoundingClientRect(); // Get the bounding rect of the component
    html2canvas(input2, {
      width: inputRect2.width,
      height: inputRect2.height,
      windowWidth: inputRect2.width,
      windowHeight: inputRect2.height,
      scale: 5,
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addPage([inputRect2.width, inputRect2.height]);
      pdf.addImage(imgData, "PNG", 0, 0, inputRect2.width, inputRect2.height); // Ensure entire canvas is added
      pdf.save(member.member_code + ".pdf");
    });
  };

  let [deleteMember, setDeleteMember] = useState();
  let onDeleteClick = (item) => {
    setDeleteMember(item);
    setDeleteModal(true);
  };

  if (!member) return;

  return (
    <Fragment>
      <div className="member">
        <h2>
          Member - <span className="member-code">{member?.member_code}</span>
        </h2>
        <div className="details">
          <div className="print-icon">
            <PrintIcon
              style={{ color: "darkblue", cursor: "pointer" }}
              onClick={handlePrint}
            />
          </div>

          <div className="photo">
            {member.photo && member.photo.includes("http") ? (
              <img src={member.photo} alt="User" />
            ) : (
              <img src={userIcon} alt="User" />
            )}
          </div>
          <div className="row">
            <p>
              <span className="title">Name: </span>
              {member?.name}
            </p>
            <p>
              <span className="title">Profession: </span>
              {member?.profession}
            </p>
            <p>
              <span className="title">Branch: </span>
              {member?.branch}
            </p>
            <p>
              <span className="title">DOB: </span>
              {toDateView(member?.DOB)}
            </p>
            <p>
              <span className="title">GSM No: </span>
              {member?.GSM_no}
            </p>
            <p>
              <span className="title">Whatsapp: </span>
              {member?.WhatsApp_no}
            </p>
            <p>
              <span className="title">Blood Group: </span>
              {member?.blood_group}
            </p>
            <p>
              <span className="title">Marital Status: </span>
              {member?.family_status}
            </p>
            <p>
              <span className="title">Email ID: </span>
              {member?.email_id}
            </p>
            <p>
              <span className="title">Residential Area: </span>
              {member?.residential_area}
            </p>
            <p>
              <span className="title">Passport No: </span>
              {member?.passport_no}
            </p>
            <p>
              <span className="title">Civil ID No: </span>
              {member?.civil_id_no}
            </p>
            <p style={{ whiteSpace: "pre-line" }}>
              <span className="title">Address in India: </span>
              {member?.address_in_India}
            </p>
            <p>
              <span className="title">Telephone No(India): </span>
              {member?.tel_no}
            </p>
            <p>
              <span className="title">Family residing in Oman: </span>
              {member?.is_family_residing_in_Oman ? "Yes" : "No"}
            </p>
          </div>
          <h3 className="ioc-title">India Unit Details</h3>
          <div className="row">
            <p>
              <span className="title">Branch: </span>
              {member?.branch_india}
            </p>
            <p>
              <span className="title">Union: </span>
              {member?.union}
            </p>
            <p>
              <span className="title">District: </span>
              {member?.district}
            </p>
          </div>
          <h3 className="family-title">Family Members</h3>
          <div className="family-table">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Relation</StyledTableCell>
                    <StyledTableCell>DOB</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {family?.map((item, index) => (
                    <StyledTableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item?.family_member_name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item?.relation}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {toDateView(item?.family_member_DOB)}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <h3 className="office-title">Office Use</h3>
          <div className="row">
            <p>
              <span className="title">Recieved On: </span>
              {toDateView(member?.received_on)}
            </p>
            <p>
              <span className="title">Submitted By: </span>
              {member?.submitted_by}
            </p>
            <p>
              <span className="title">Checked By: </span>
              {member?.checked_by}
            </p>
            <p>
              <span className="title">Approved By: </span>
              {member?.approved_by}
            </p>
            <p>
              <span className="title">Application No: </span>
              {member?.application_no}
            </p>
            <p>
              <span className="title">President: </span>
              {member?.president}
            </p>
            <p>
              <span className="title">Secretary: </span>
              {member?.secretary}
            </p>
            <p>
              <span className="title">Expiry: </span>
              {toDateView(member?.expiry)}
            </p>
          </div>
          <div className="action-buttons">
            <div className="edit-btn">
              <Button
                variant="contained"
                size="small"
                fullWidth
                style={{ textTransform: "none", fontSize: "1rem" }}
                onClick={() => navigate("/edit-member/" + id)}
              >
                Edit
              </Button>
            </div>
            <div className="delete-btn">
              <Button
                variant="contained"
                size="small"
                fullWidth
                color="error"
                style={{ textTransform: "none", fontSize: "1rem" }}
                onClick={() => onDeleteClick(member)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MemberDeleteModal
        show={deleteModal}
        closeModal={() => setDeleteModal(false)}
        member={deleteMember}
      />

      <div className="hide">
        <div className="id-card-front">
          <IdCardFront
            member={member}
            family={family}
            img={img}
            ref={componentRef}
          />
        </div>
        <div className="id-card-back">
          <IdCardBack member={member} family={family} ref={componentRef2} />
        </div>
      </div>
    </Fragment>
  );
}
