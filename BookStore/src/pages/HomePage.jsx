import { useState, useEffect, Suspense, lazy, useMemo } from "react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Trending from "../components/Trending";

const BookCarousal = lazy(() => import("../components/BookCarousal"));
const HomePage = () => {
  return (
    <>
      <Navbar />
      <main role="main">
        <Trending/>
        
        <Suspense fallback={<Loading />}>
          <BookCarousal query={"New-arrivals"} />
          <BookCarousal query={"E-books"} />
          <BookCarousal query={"Comic-books"} />
        </Suspense>
      </main>
    </>
  );
};

export default HomePage;
