import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const HeaderSection = ({ setFilter, filter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown=()=>{
    if(open)setIsOpen(false)
  }

  return (
    <section className="jumbotron text-center">
      <div className="container">
        <h1 className="jumbotron-heading mt-2">One store for every book</h1>
        <p className="lead text-muted">
          Read your favourite book for free{" "}
          <Link to={"/viewOffers"}>
            <small>try premium</small>
          </Link>
        </p>
        <div className="container mt-5">
          <h2>Select a Book Genre</h2>
          <div className="dropdown d-flex justify-content-center">
            <button
              className="btn btn-primary dropdown-toggle mb-3"
              type="button"
              id="dropdownMenuButton"
              aria-expanded={isOpen ? "true" : "false"}
              onClick={toggleDropdown} // Toggle dropdown on click
            >
              Choose Genre
            </button>
            {filter && (
              <button
                onClick={() => {
                  setFilter(null);
                  closeDropdown();
                }} // Trigger reset action
                className="btn btn-secondary mb-3"
              >
                Unfilter
              </button>
            )}
            <ul
              className={`dropdown-menu mt-5 ${isOpen ? "show" : ""}`}
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <p
                  className="dropdown-item m-0"
                  onClick={() => {
                    setFilter("Fiction");
                    toggleDropdown();
                  }}
                >
                  Fiction
                </p>
              </li>

              <li>
                <p
                  className="dropdown-item m-0"
                  onClick={() => {
                    setFilter("Romance");
                    toggleDropdown();
                  }}
                >
                  Romance
                </p>
              </li>
              <li>
                <p
                  className="dropdown-item m-0"
                  onClick={() => {
                    setFilter("Non-fiction");
                    toggleDropdown();
                  }}
                >
                  Non-fiction
                </p>
              </li>
              <li>
                <p
                  className="dropdown-item m-0"
                  onClick={() => {
                    setFilter("Biography");
                    toggleDropdown();
                  }}
                >
                  Biography
                </p>
              </li>

              <li>
                <p
                  className="dropdown-item m-0"
                  onClick={() => {
                    setFilter("Self-help");
                    toggleDropdown();
                  }}
                >
                  Self-help
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
