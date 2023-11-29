import React from "react";

const Error = ({ message }) => {
  return (
    <div className="mx-3">
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    </div>
  );
};

export default Error;
