import React from "react";
import BookItem from "./BookItem";
import { Grid2, Box, Container } from "@mui/material"; // Changed to Grid2 from @mui/material

const BookList = ({ bookList }) => {
  return (
    <Box sx={{ py: 5, backgroundColor: "background.default", marginLeft:'45px' }}>
      <Container>
        {/* Using MUI Grid2 container to display books in 3 per row */}
        <Grid2 container spacing={2}>
          {bookList.length !== 0 &&
            bookList.map((book,index) => (
              <Grid2 xs={12} sm={6} md={4} key={index}>
                <BookItem bookData={book} />
              </Grid2>
            ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default BookList;
