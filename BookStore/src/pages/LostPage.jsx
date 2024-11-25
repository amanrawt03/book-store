import React from "react";
import { useNavigate } from "react-router-dom";

const LostPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); 
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center text-white bg-dark">
      <main className="px-3">
        <h1>Sorry!!</h1>
        <p className="lead">You've lost your way</p>
        <p className="lead">
          <button
            className="btn btn-md btn-light"
            onClick={handleGoHome}
          >
            Return to Home
          </button>
        </p>
      </main>
    </div>
  );
};

export default LostPage;
