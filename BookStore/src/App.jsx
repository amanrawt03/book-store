import "bootstrap/dist/css/bootstrap.min.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import "./App.css";
import HomePage from "./pages/HomePage";
import LostPage from "./pages/LostPage";
import ViewBookPage from './pages/ViewBookPage'
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
function App(){
  return (
    <Routes>
      <Route exact path="/" element={<HomePage/>}></Route>
      <Route exact path="book/:id" element={<ViewBookPage/>}></Route>
      <Route exact path="signup" element={<SignupPage/>}></Route>
      <Route exact path="signin" element={<SigninPage/>}></Route>
      <Route exact path="*" element={<LostPage/>}></Route>
    </Routes>
  );
}

export default App;
