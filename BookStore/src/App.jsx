import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Import slick carousel's CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./App.css";
import HomePage from "./pages/HomePage";
import LostPage from "./pages/LostPage";
import ViewBookPage from "./pages/ViewBookPage";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import ViewCartPage from "./pages/ViewCartPage";
import SearchedBooksPage from "./pages/SearchedBooksPage";
import ProtectedRoutes from "./protectedRoutes";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="signup" element={<SignupPage />} />
      <Route exact path="signin" element={<SigninPage />} />
      <Route exact path="*" element={<LostPage />} />

      <Route element={<ProtectedRoutes />}>
        <Route exact path="searchedBooks" element={<SearchedBooksPage />} />
        <Route exact path="cart" element={<ViewCartPage />} />
        <Route exact path="book/:id" element={<ViewBookPage />} />
      </Route>
    </Routes>
  );
}

export default App;
