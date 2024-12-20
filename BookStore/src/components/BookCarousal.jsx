import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid2,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const BookCarousal = ({ query }) => {
  const [carousalName, setCarousalName] = useState(null);
  const [carousalList, setCarousalList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query !== "New-arrivals" && query !== "E-books" && query !== 'Comic-books') {
      setCarousalName("Similar Books");
    } else {
      setCarousalName(query);
    }
  }, [query]);  // This effect runs when query changes

  const getSimilarItems = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/book/getBooks?query=${query}`);
      const books = res.data.books;
      if (books.length === 0) setIsEmpty(true);
      else setCarousalList(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getSimilarItems();
  }, [query]);  // This effect runs when query changes

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: <ArrowForwardIos sx={{ color: "#808080", fontSize: 30 }} />,
    prevArrow: <ArrowBackIos sx={{ color: "#808080", fontSize: 30 }} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isEmpty) {
    return (
      <Typography variant="h5" align="center" gutterBottom>
        No similar books found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {carousalName}
      </Typography>
      <Slider {...settings}>
        {carousalList.map((book, index) => (
          <Grid2 xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: 3,
                borderRadius: 2,
                cursor: "pointer",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
                width: "260px",
              }}
            >
              <CardMedia
                component="img"
                alt={book.volumeInfo.title}
                image={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://images.unsplash.com/photo-1551300329-b91a61fa5ebe?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                sx={{
                  height: "150px",
                  objectFit: "contain",
                  borderRadius: "10px 10px 0 0",
                  marginTop: "10px",
                }}
                onClick={() => navigate(`/book/${book.id}`)}
              />
              <CardContent sx={{ flexGrow: 1, padding: 2 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",                                                                                                       
                    marginTop: "10px",                        
                  }}
                >
                  {book.volumeInfo.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Author:</strong>{" "}
                  {book.volumeInfo.authors
                    ? book.volumeInfo.authors[0]
                    : "Unknown Author"}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginLeft: "auto", marginTop: "10px" }}
                >
                  <CurrencyRupeeIcon fontSize="small" />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                  {book.volumeInfo.pageCount === 0
                    ? 55
                    : book.volumeInfo.pageCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Slider>
    </Box>
  );
};

export default BookCarousal;
