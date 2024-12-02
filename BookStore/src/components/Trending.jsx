import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardActionArea, CardMedia, Grid } from "@mui/material";

const Trending = () => {
  const navigate = useNavigate();

  const books = [
    {
      id: "TNKZzgEACAAJ",
      imgSrc: "https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_.jpg"
    },
    {
      id: "PcWvDgAAQBAJ",
      imgSrc: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9788197489532/karna-book-2-9788197489532_xlg.jpg",
      alt: "Karna Book 2"
    },
    {
      id: "uwh5swEACAAJ",
      imgSrc: "https://m.media-amazon.com/images/I/81aCMT1zKtL._AC_UF1000,1000_QL80_.jpg",
      alt: "Some Book"
    }
  ];

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
        Top Reads
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {books.map((book) => (
          <Grid item xs={12} sm={4} key={book.id}>
            <Card sx={{ height: "40vh", boxShadow: 4 }}>
              <CardActionArea onClick={() => navigate(`/book/${book.id}`)}>
                <CardMedia
                  component="img"
                  height="300"
                  image={book.imgSrc}
                  alt={book.alt}
                  
                  sx={{
                    objectFit: "contain", // Ensures the image fits within the container
                    width: "100%", // Makes the image take up the full width of the container
                    height: "100%", // Ensures the image respects the container's height
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "all 0.3s ease",
                    }
                  }}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Trending;
