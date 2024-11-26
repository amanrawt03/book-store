import React from "react";
import BookItem from "./BookItem";
import { Grid2, Box, Container } from "@mui/material";

const BookList = ({ bookList }) => {
  return (
    <Box sx={{ py: 5, backgroundColor: "background.default" }}>
      <Container>
        {/* Using Grid2 container to display books in 3 per row */}
        <Grid2 container spacing={4}>
          {bookList.length !== 0 && 
            bookList.map((book) => (
              <Grid2 item xs={12} sm={6} md={4} key={book.id}>
                <BookItem bookData={book} />
              </Grid2>
            ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default BookList;
