import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status" aria-hidden="true">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Loading;
