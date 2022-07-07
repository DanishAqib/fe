import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import ModifyStudents from "./ModifyStudents";

function Students() {
  const [students, setStudents] = useState([]);
  const getStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/students");
      const studentsData = await response.json();
      setStudents(studentsData);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getStudents();
  }, []);

  const deleteStudent = async (id) => {
    try {
      const delStudent = await fetch(`http://localhost:5000/students/${id}`, {
        method: "DELETE",
      });
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        align="center"
        fontFamily="Poppins"
        fontWeight="bold"
        marginTop="4rem"
      >
        Students
      </Typography>
      <TableContainer
        component={Paper}
        style={{ marginTop: "1rem", border: "1px solid #000" }}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>First&nbsp;Name</b>
              </TableCell>
              <TableCell>
                <b>Last&nbsp;Name</b>
              </TableCell>
              <TableCell>
                <b>Edit</b>
              </TableCell>
              <TableCell>
                <b>Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => {
              const { id, first_name, last_name } = student;
              return (
                <TableRow key={id}>
                  <TableCell>{first_name}</TableCell>
                  <TableCell>{last_name}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" color="success">
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      color="warning"
                      onClick={() => deleteStudent(id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ModifyStudents />
    </Container>
  );
}

export default Students;
