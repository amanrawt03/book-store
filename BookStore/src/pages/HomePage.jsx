import React, { useState, useEffect, Suspense, lazy, useMemo } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import HeaderSection from "../components/HeaderSection";
import NoMoreLeft from "../components/NoMoreLeft";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { debounce } from "lodash";

// Lazy load components
const BookList = lazy(() => import("../components/BookList"));

const HomePage = () => {
  const [bookList, setBookList] = useState([]); // Currently displayed books
  const [searchQuery, setSearchQuery] = useState(""); // To store search query
  const [startIndex, setStartIndex] = useState(0); // Track where to start loading books
  const [isLoading, setIsLoading] = useState(false); // To track if books are loading
  const [hasMore, setHasMore] = useState(true); // Whether more books are available
  const [found, setFound] = useState(true); // To track if books are found
  const dispatch = useDispatch();

  const booksPerPage = 12; // Books to load per request

  // Debounce the search query to avoid multiple API calls during typing
  const debouncedSearch = useMemo(
    () => debounce((query) => {
      fetchBooks(query, 0); // Reset startIndex for search
    }, 1000),
    []
  );

  // Fetch books based on the query and startIndex
  const fetchBooks = (search = "book", startIndex = 0) => {
    setIsLoading(true);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyDZM1wVAo6gCblQdxUjIcDlKqbXl6w31FM&maxResults=${booksPerPage}&startIndex=${startIndex}`)
      .then((res) => {
        const books = res.data.items || [];
        if (books.length < booksPerPage) {
          setHasMore(false); // No more books to load
        }
        setBookList((prevBooks) => (startIndex === 0 ? books : [...prevBooks, ...books]));
        if (startIndex === 0 && books.length === 0) setFound(false);
      })
      .catch((err) => {
        console.error("Error fetching books: ", err);
        setHasMore(false); // Disable "Load More" button if there's an error
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Initial books load or search-based load
  useEffect(() => {
    if (searchQuery) {
      fetchBooks(searchQuery, startIndex); // Search query triggers new load
    } else {
      fetchBooks("book", startIndex); // Regular book load on scroll
    }
  }, [startIndex, searchQuery]);

  // Handle the search logic
  const handleSearchBook = (searchedKeywords) => {
    if(searchedKeywords === "No Filter"){searchedKeywords = "book"}
    setSearchQuery(searchedKeywords);
    debouncedSearch(searchedKeywords);
  };

  // Handle "Load More" click
  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setStartIndex((prevIndex) => prevIndex + booksPerPage); // Increment startIndex for next page
    }
  };

  if (!found) {
    return <h1>No books found for this query</h1>;
  }

  return (
    <>
      <Navbar searchBookFn={handleSearchBook} />
      <main role="main">
        <HeaderSection filterBooks = {handleSearchBook}/>
        
        <Suspense fallback={<Loading />}>
          <BookList bookList={bookList} />
        </Suspense>
        {hasMore && !isLoading && (
          <Button
            className="load-more-btn"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: "10px" }}
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        )}
        {isLoading && <Loading />}
        {!hasMore && <NoMoreLeft />}
      </main>
    </>
  );
};

export default HomePage;
