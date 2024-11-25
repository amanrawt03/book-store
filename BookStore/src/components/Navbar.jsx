import React from "react";

const Navbar = ({searchBookFn}) => {
  const handleOnChange =(e)=>{
    searchBookFn(e.target.value)
  }
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand ms-3">Book Store   </a>
      <form className="d-flex gap-4 form me-3">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleOnChange}
        />
      </form>
    </nav>
  );
};

export default Navbar;
