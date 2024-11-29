import React, { useState, useEffect } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid2,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
  Divider,
} from "@mui/material";
import Navbar from "../components/Navbar";
import BookCarousal from "../components/BookCarousal";
import AddToCart from "../components/AddToCart";

const ViewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [authenticated, setAuthenticated] = useState('false');
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/protect", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setAuthenticated(true); // User is authenticated
        }
      } catch (error) {
        setAuthenticated(false); // If error occurs (invalid token, no token)
        navigate("/login"); // Redirect to login page
      }
    };

    checkAuth();
  }, []);

  const getBook = async () => {
    // setLoading(true);
    try {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyCkS0j6hAV0oA1H4CyBVWJhk5yDN-g8KXw`
        )
        .then((res) => {
          setBook(res.data);
        });
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  useEffect(() => {
    getBook();
  }, [id]);


  if (!book) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const { volumeInfo } = book;
  const {
    title = "No Title Available",
    authors = ["J.k. Rowling"],
    publisher = "Unknown Publisher",
    publishedDate = "Unknown Publication Date",
    description = "No Description Available",
    imageLinks = {},
    pageCount,
    availability = "In Stock", // Assuming availability info is available
  } = volumeInfo || {};

  const imageSrc =
    imageLinks?.thumbnail ||
    "https://images.unsplash.com/photo-1551300329-b91a61fa5ebe?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  if (!authenticated) {
    console.log('not authenticated')
    return <Loading />
  }
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* First Section: Flex Layout */}
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
          {/* Book Cover */}
          <Box
            flexShrink={0}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CardMedia
              component="img"
              alt={title}
              image={imageSrc}
              sx={{
                width: 200,
                height: 300,
                objectFit: "cover",
                borderRadius: 1,
              }}
            />
          </Box>

          {/* Book Content */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {authors}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              Price: <CurrencyRupeeIcon sx={{ fontSize: "19px" }} />
              {pageCount === 0 ? 655 : pageCount * 3}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Published on: {publishedDate} | Pages: {pageCount || "N/A"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Publisher:</strong> {publisher}
            </Typography>

            {/* Availability and Shipping */}
            <Typography variant="body1" color="textPrimary">
              <strong>Available</strong> | Ships within 4-6 Business Days
            </Typography>
          </Box>

          {/* Add to Cart Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <AddToCart book={book} />
          </Box>
        </Box>

        {/* Divider to Separate Sections */}
        <Divider sx={{ my: 4 }} />

        {/* Second Section: About the Book */}
        {availability === "In Stock" && (
          <Box sx={{ mb: 4 }}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  About the Book
                </Typography>
                <Typography variant="body1">{description}</Typography>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Carousal Section */}
        <BookCarousal currentBook={book} />

        {/* Social Links Section */}
        <Grid2 container spacing={4} sx={{ mt: 4 }}>
          <Grid2 xs={12}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Find us on
                </Typography>
                <ul>
                  <li>
                    <a href="#">GitHub</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default ViewBook;
