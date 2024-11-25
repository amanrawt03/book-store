import React, { useEffect, useState } from "react";
import BookItem from "./BookItem";
const BookList = ({bookList}) => {
  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row">
          {bookList.length !==0 &&
            bookList.map((book) => {
              return <BookItem bookData={book} key={book.id}></BookItem>;
            })}
        </div>
      </div>
    </div>
  );
};

export default BookList;
