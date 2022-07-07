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

function ModifyStudents() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        id: new Date().getTime().toString(),
        first_name: firstName,
        last_name: lastName,
      };
      const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
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
            Add a Student
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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

export default ModifyStudents;
