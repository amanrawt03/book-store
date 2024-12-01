import React, { useState, useEffect, Suspense, lazy, useMemo } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import HeaderSection from "../components/HeaderSection";
import NoMoreLeft from "../components/NoMoreLeft";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const BookList = lazy(() => import("../components/BookList"));
const BookCarousal = lazy(() => import("../components/BookCarousal"));

const HomePage = () => {
  const [bookList, setBookList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [found, setFound] = useState(true);

  const booksPerPage = 12;
  const navigate = useNavigate();

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        fetchBooks(query, 0);
      }, 1000),
    []
  );

  const fetchBooks = (search = "book", startIndex = 0) => {
    setIsLoading(true);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyDZM1wVAo6gCblQdxUjIcDlKqbXl6w31FM&maxResults=${booksPerPage}&startIndex=${startIndex}`
      )
      .then((res) => {
        const books = res.data.items || [];
        setHasMore(books.length === booksPerPage);
        setBookList((prevBooks) =>
          startIndex === 0 ? books : [...prevBooks, ...books]
        );
        if (startIndex === 0 && books.length === 0) setFound(false);
      })
      .catch(() => {
        setHasMore(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks(searchQuery || "book", startIndex);
  }, [startIndex, searchQuery]);

  const handleSearchBook = (query) => {
    setSearchQuery(query === "No Filter" ? "book" : query);
    debouncedSearch(query === "No Filter" ? "book" : query);
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setStartIndex((prev) => prev + booksPerPage);
    }
  };

  if (!found) {
    return <h1>No books found for this query</h1>;
  }

  return (
    <>
      <Navbar searchBookFn={handleSearchBook} />
      <main role="main">
        <HeaderSection filterBooks={handleSearchBook} />
        <Suspense fallback={<Loading />}>
          <BookCarousal query="New-arrivals" />
          <BookCarousal query="E-books" />
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
