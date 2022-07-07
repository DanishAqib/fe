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
import "./ModifyBooks";
import { Edit, Delete, Add } from "@mui/icons-material";
import ModifyBooks from "./ModifyBooks";

function Books() {
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/books");
      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      const delBook = await fetch(`http://localhost:5000/books/${id}`, {
        method: "DELETE",
      });
      setBooks(books.filter((book) => book.book_id !== id));
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
        marginTop="2rem"
      >
        Books
      </Typography>
      <TableContainer
        component={Paper}
        style={{ marginTop: "1rem", border: "1px solid #000" }}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Book&nbsp;Name</b>
              </TableCell>
              <TableCell>
                <b>Book&nbsp;Author</b>
              </TableCell>
              <TableCell>
                <b>Borrowed&nbsp;By</b>
              </TableCell>
              <TableCell>
                <b>Date&nbsp;of&nbsp;Borrow</b>
              </TableCell>
              <TableCell>
                <b>Date&nbsp;of&nbsp;Return</b>
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
            {books.map((book) => {
              const {
                book_id,
                book_name,
                book_author,
                borrowed_by,
                date_of_borrow,
                date_of_return,
              } = book;
              return (
                <TableRow key={book_id}>
                  <TableCell>{book_name}</TableCell>
                  <TableCell>{book_author}</TableCell>
                  <TableCell>{borrowed_by}</TableCell>
                  <TableCell>{date_of_borrow}</TableCell>
                  <TableCell>{date_of_return}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" color="success">
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      color="warning"
                      onClick={() => deleteBook(book_id)}
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
      <ModifyBooks />
    </Container>
  );
}

export default Books;
