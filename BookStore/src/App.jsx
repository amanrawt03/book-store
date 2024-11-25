import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/HomePage";
import LostPage from "./pages/LostPage";
import ViewBookPage from './pages/ViewBookPage'
import OffersPage from './pages/OffersPage'
import { Route, Routes } from "react-router-dom";
function App(){
  return (
    <Routes>
      <Route exact path="/" element={<HomePage/>}></Route>
      <Route exact path="/viewOffers" element={<OffersPage/>}></Route>
      <Route exact path="book/:id" element={<ViewBookPage/>}></Route>
      <Route exact path="*" element={<LostPage/>}></Route>
    </Routes>
  );
}

export default App;
