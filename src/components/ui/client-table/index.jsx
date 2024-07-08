import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { client } from "@service";

import deleteImg from "./../../../assets/delete.svg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ActionButton = styled("img")(({ theme }) => ({
  cursor: "pointer",
  margin: theme.spacing(0, 1),
  "&:hover": {
    opacity: 0.8,
  },
}));

const CustomizedTables = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const deleteItem = async (id) => {
    try {
      const response = await client.delete(id);
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Delete request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T / R</StyledTableCell>
              <StyledTableCell align="center">Client Full Name</StyledTableCell>
              <StyledTableCell align="center">
                Client Phone Number
              </StyledTableCell>
              <StyledTableCell align="center">Service id</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item, index) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell align="center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.full_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.phone_number}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.owner_id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ActionButton
                    src={deleteImg}
                    alt="Delete"
                    onClick={() => deleteItem(item.id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </>
  );
};

export default CustomizedTables;
