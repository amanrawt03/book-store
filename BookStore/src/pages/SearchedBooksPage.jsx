import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BookList from "../components/BookList";
import FilterBar from "../components/FilterBar";
import { Button } from "@mui/material";
import Loading from "../components/Loading";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SearchedBooksPage = () => {
  const [bookList, setBookList] = useState([]);
  const [totalItems, setTotalItems] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [found, setFound] = useState(true);
  const booksPerPage = 12;

  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("query") || "book";

  // Fetch books from API
  const fetchBooks = async (search = "book", startIndex = 0, filters = {}) => {
    try {
      setIsLoading(true);

      const params = {
        query: search,
        startIndex,
        limit: booksPerPage,
        ...filters,
      };

      const { data } = await axios.post("http://localhost:3000/api/book/filterBooks", params);
      console.log(data)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
      const { books, totalItems: total } = data;

      setTotalItems(total);
      setHasMore(books.length === booksPerPage);
      setBookList((prev) =>
        startIndex === 0 ? books : [...prev, ...books]
      );
      if (startIndex === 0 && books.length === 0) setFound(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(queryParam, startIndex);
  }, [queryParam, startIndex]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setStartIndex((prev) => prev + booksPerPage);
    }
  };

  if (!found) {
    return <h1>No books found for this query</h1>;
  }

  return (
    <div>
      <Navbar />
      <div className="container d-flex">
        {/* Pass the fetchBooks function and queryParam to FilterBar */}
        <FilterBar queryParam={queryParam} fetchBooks={fetchBooks} />
        <BookList
          bookList={bookList}
          totalItems={totalItems}
          searchedFor={queryParam}
        />
      </div>
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
      {!hasMore && <h2>No more results available.</h2>}
    </div>
  );
};

export default SearchedBooksPage;
