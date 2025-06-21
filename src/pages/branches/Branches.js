import React, { useEffect, useState } from "react";
import "./branches.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import EditBranchModal from "./edit-branch-modal/EditBranchModal";
import DeleteBranchModal from "./delete-branch-modal/DeleteBranchModal";
import api from "../../api";

export default function Branches() {
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

  let [editModal, setEditModal] = useState(false);
  let [deleteModal, setDeleteModal] = useState(false);
  let [editBranch, setEditBranch] = useState();
  let [deleteBranch, setDeleteBranch] = useState();

  useEffect(() => {
    fetchBranches();
  }, []);

  const [branches, setBranches] = React.useState([]);

  let fetchBranches = async () => {
    let { data } = await api.get("branches");
    setBranches(data);
  };

  let [formData, setFormData] = useState({});
  const [submitBtn, setSubmitBtn] = useState(0);
  let onInputChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let onFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn(1);
    await api.post("branches", formData);
    window.location.reload();
  };

  let onEditClick = (item) => {
    setEditBranch(item);
    setEditModal(true);
  };

  let onDeleteClick = (item) => {
    setDeleteBranch(item);
    setDeleteModal(true);
  };

  return (
    <div className="branches">
      <h2>Branches</h2>

      <form onSubmit={onFormSubmit}>
        <div className="add-branch">
          <div className="input-field">
            <TextField
              label="New Branch"
              variant="outlined"
              size="small"
              fullWidth
              name="branch_name"
              required
              onChange={onInputChange}
            />
          </div>
          <div className="add-btn">
            <Button
              variant="contained"
              size="small"
              style={{ textTransform: "none", fontSize: "1rem" }}
              fullWidth
              type="submit"
              disabled={submitBtn}
            >
              {submitBtn ? "Adding..." : "Add"}
            </Button>
          </div>
        </div>
      </form>

      <div className="all-branches">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sl No</StyledTableCell>
                <StyledTableCell>Branch</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branches.map((item, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.branch_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <EditIcon
                      style={{
                        color: "darkblue",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                      }}
                      onClick={() => onEditClick(item)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <DeleteIcon
                      style={{
                        color: "darkred",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                      }}
                      onClick={() => onDeleteClick(item)}
                    />
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <EditBranchModal
        show={editModal}
        closeModal={() => setEditModal(false)}
        branch={editBranch}
      />
      <DeleteBranchModal
        show={deleteModal}
        closeModal={() => setDeleteModal(false)}
        branch={deleteBranch}
      />
    </div>
  );
}
