import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from 'axios'
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import HeaderSection from '../components/HeaderSection'

// Lazy load components
const BookList = lazy(() => import("../components/BookList"));

const HomePage = () => {
  const [bookList, setBookList] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [filter, setFilter] = useState(null);

  const filterList = (filter) => {
    return allBooks.filter((book) => book.genre === filter);
  };

  const handleSearchBook = (searchedKeywords) => {
    if (searchedKeywords === "") {
      setBookList(allBooks);
    } else {
      let newBookList = allBooks.filter((book) =>
        book.bookName.toLowerCase().includes(searchedKeywords.toLowerCase())
      );
      setBookList(newBookList);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/bookStore')
    .then(res=>{
      setAllBooks(res.data)
      setBookList(res.data)
    })
  }, []);

  useEffect(()=>{
    if(filter !== null){
      const filteredBooks = filterList(filter);
      setBookList(filteredBooks);
    }else{
      setBookList(allBooks)
    }
  }, [filter])

  return (
    <>
      <Navbar searchBookFn={handleSearchBook} />
      <main role="main">
        {/* <HeaderSection filterBooks={handleFilterBooks} filter={filter} /> */}
        <HeaderSection setFilter={setFilter} filter={filter} />
        <Suspense fallback={<Loading />}>
          <BookList bookList={bookList} />
        </Suspense>
      </main>
    </>
  );
};

export default HomePage;
