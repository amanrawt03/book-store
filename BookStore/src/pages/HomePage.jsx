import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import HeaderSection from '../components/HeaderSection';

// Lazy load components
const BookList = lazy(() => import("../components/BookList"));

const HomePage = () => {
  const [bookList, setBookList] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [filter, setFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // To store search query

  // Filter books based on category
  const filterList = (filter) => {
    return allBooks.filter((book) => {
      return book.volumeInfo.categories && book.volumeInfo.categories[0] === filter;
    });
  };

  // Handle the search logic
  const handleSearchBook = (searchedKeywords) => {
    setSearchQuery(searchedKeywords);
  };

  useEffect(() => {
    // Fetch books from the API
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=book&key=AIzaSyBAsMAiNp8g1X6TDpcrc0vRQY4y5RFS3lo&maxResults=40`)
    .then(res => {
      const books = res.data.items || [];
      setAllBooks(books);
      setBookList(books); // Set the initial list of books
    })
    .catch(err => console.error("Error fetching books: ", err));
  }, []);

  useEffect(() => {
    let filteredBooks = allBooks;

    // Apply filter by category if selected
    if (filter) {
      filteredBooks = filterList(filter);
    }

    // Apply search filter by title
    if (searchQuery) {
      filteredBooks = filteredBooks.filter((book) =>
        book.volumeInfo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setBookList(filteredBooks); // Update the displayed book list
  }, [filter, searchQuery, allBooks]); // Re-run whenever filter, searchQuery, or allBooks changes

  return (
    <>
      <Navbar searchBookFn={handleSearchBook} />
      <main role="main">
        <HeaderSection setFilter={setFilter} filter={filter} />

        {/* Conditionally show "No books found" message */}
        {bookList.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h4>No books found matching your search criteria.</h4>
          </div>
        ) : (
          <Suspense fallback={<Loading />}>
            <BookList bookList={bookList} />
          </Suspense>
        )}
      </main>
    </>
  );
};

export default HomePage;
