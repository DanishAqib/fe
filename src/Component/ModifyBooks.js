import React, { useState } from "react";
import {
  Button,
  IconButton,
  Typography,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.5rem",
};

function ModifyBooks() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [borrowedBy, setBorrowedBy] = useState("");
  const [dateOfBorrow, setDateOfBorrow] = useState("");
  const [dateOfReturn, setDateOfReturn] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        book_id: new Date().getTime().toString(),
        book_name: bookName,
        book_author: bookAuthor,
        borrowed_by: borrowedBy,
        date_of_borrow: dateOfBorrow,
        date_of_return: dateOfReturn,
      };
      const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      window.location = "/";
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <IconButton
        style={{
          marginTop: 10,
          position: "relative",
          left: "96%",
          transform: "scale(1.2)",
        }}
        onClick={handleOpen}
      >
        <Add color="success" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a Book
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Book Author"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
          />
          <TextField
            id="outlined-name"
            label="Borrowed By"
            value={borrowedBy}
            onChange={(e) => setBorrowedBy(e.target.value)}
          />
          <TextField
            id="outlined-name"
            label="Date of Borrow"
            value={dateOfBorrow}
            onChange={(e) => setDateOfBorrow(e.target.value)}
          />
          <TextField
            id="outlined-name"
            label="Date of Return"
            value={dateOfReturn}
            onChange={(e) => setDateOfReturn(e.target.value)}
          />
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Button variant="contained" color="primary" onClick={onSubmitForm}>
              Save
            </Button>
            <Button variant="contained" color="warning" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModifyBooks;
