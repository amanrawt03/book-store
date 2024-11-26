import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SuggestedBook from "../components/SuggestedBook";
import { Container, Grid2, Typography, Card, CardContent, CircularProgress, Box, CardMedia } from "@mui/material";

const ViewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null); // book is initially null
  const [bookSuggestion, setBookSuggestion] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  const getBook = async () => {
    setLoading(true); // Start loading
    try {
      // Fetching books from Google Books API
      const response = await axios.get("https://www.googleapis.com/books/v1/volumes?q=book&key=AIzaSyBAsMAiNp8g1X6TDpcrc0vRQY4y5RFS3lo&maxResults=40");
      const data = response.data.items || []; // Axios automatically parses JSON

      // Find the selected book based on the ID from the URL
      const selectedBook = data.find((book) => book.id === id);
      if (selectedBook) {
        setBook(selectedBook);
      }

      // Generate random book suggestions (ensuring no duplicates)
      const getRandomIndex = () => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * data.length);
        } while (data[randomIndex].id === id); // Exclude the selected book
        return randomIndex;
      };

      // Ensure unique suggestions
      let suggestionArr = [];
      while (suggestionArr.length < 3) {
        const randomBook = data[getRandomIndex()];
        if (!suggestionArr.some((book) => book.id === randomBook.id)) {
          suggestionArr.push(randomBook);
        }
      }

      setBookSuggestion(suggestionArr);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
    setLoading(false); // End loading
  };

  useEffect(() => {
    getBook();
  }, [id]); // Fetch book data when the `id` parameter changes

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Safely render the book data if available
  if (!book) {
    return <Typography variant="h5" color="error" align="center">Book not found.</Typography>;
  }

  // Destructure book data to avoid deep chaining repeatedly
  const { volumeInfo, searchInfo } = book;
  const {
    title = "No Title Available",
    authors = ["Unknown Author"],
    publisher = "Unknown Publisher",
    publishedDate = "Unknown Publication Date",
    description = "No Description Available",
    imageLinks = {},
    pageCount,
  } = volumeInfo || {};

  // Extract the "Part which readers liked the most" from the searchInfo's textSnippet
  const readersLiked = searchInfo?.textSnippet || "No specific part that readers liked the most.";

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid2 container spacing={4}>
        {/* Left Column: Book Details */}
        <Grid2 item xs={12} md={8}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                {title}
              </Typography>
              {imageLinks?.thumbnail && (
                <CardMedia
                  component="img"
                  alt={title}
                  image={imageLinks.thumbnail}
                  sx={{ width: 150, height: 200, objectFit: 'cover', borderRadius: 1, mb: 2 }}
                />
              )}
              <Typography variant="h6" color="textSecondary">
                {description}
              </Typography>
              <Typography variant="body1">
                Published on: {publishedDate} | Pages: {pageCount || "N/A"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Author(s):</strong> {authors.join(", ")}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Publisher:</strong> {publisher}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Right Column: Readers Liked the Most and Suggested Books */}
        <Grid2 item xs={12} md={4}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Readers Liked the Most
              </Typography>
              {/* Display the textSnippet (what readers liked the most) */}
              <Typography variant="body2" color="textSecondary" paragraph>
                {readersLiked}
              </Typography>
            </CardContent>
          </Card>

          {/* Suggested Books */}
          <Card sx={{ boxShadow: 3, mt: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Read other books
              </Typography>
              <Grid2 container spacing={2}>
                {bookSuggestion.length === 3 ? (
                  bookSuggestion.map((suggestedBook) => (
                    <Grid2 item xs={12} sm={6} key={suggestedBook.id}>
                      <SuggestedBook bookData={suggestedBook} />
                    </Grid2>
                  ))
                ) : (
                  <Typography variant="body2">Loading suggestions...</Typography>
                )}
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      {/* Social Media Links */}
      <Grid2 container spacing={4} sx={{ mt: 4 }}>
        <Grid2 item xs={12}>
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
  );
};

export default ViewBook;
