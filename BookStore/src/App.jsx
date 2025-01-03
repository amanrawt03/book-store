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
import OrderPlacement from './components/checkout/OrderPlacement'
// import ProtectedRoutes from "./protectedRoutes";
import { ToastContainer, toast } from "react-toastify";
import CheckoutPage from "./pages/CheckoutPage";
function App() {
  const showToast = () => {
    toast.success("This is a success message!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <Routes>
        showToast={showToast}
        <Route exact path="/" element={<HomePage showToast={showToast} />} />
        <Route
          exact
          path="signup"
          element={<SignupPage showToast={showToast} />}
        />
        <Route
          exact
          path="signin"
          element={<SigninPage showToast={showToast} />}
        />
        <Route exact path="*" element={<LostPage showToast={showToast} />} />
        {/* <Route element={<ProtectedRoutes />}> */}
        <Route
          exact
          path="searchedBooks"
          element={<SearchedBooksPage showToast={showToast} />}
        />
        <Route
          exact
          path="cart"
          element={<ViewCartPage showToast={showToast} />}
        />
        <Route
          exact
          path="checkout"
          element={<CheckoutPage showToast={showToast} />}
        />
        <Route
          exact
          path="book/:id"
          element={<ViewBookPage showToast={showToast} />}
        />
        <Route
          exact
          path="/orderPlacement"
          element={<OrderPlacement showToast={showToast} />}
        />
        
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
