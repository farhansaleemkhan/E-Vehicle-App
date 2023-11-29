import React from "react";

function TableButton({ value = "Button", data, handler }) {
  const { placeholder, clickable } = value;
  return (
    <div>
      <button
        type="button"
        className="buttonDarker"
        style={{ cursor: clickable ? "pointer" : "not-allowed" }}
        // data-bs-toggle="collapse"
        // data-bs-target="#navbarNav"
        // aria-controls="navbarNav"
        // aria-expanded="false"
        // aria-label="Toggle navigation"
        onClick={() => {
          if (clickable) handler(data);
        }}
      >
        {placeholder}
      </button>
    </div>
  );
}

export default TableButton;
