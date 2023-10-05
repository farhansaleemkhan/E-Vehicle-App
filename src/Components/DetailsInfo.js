import React from "react";

export default function DetailsInfo({ obj }) {
  return (
    <div className="detailsInfoScreen">
      {Object.keys(obj).map((key, index) =>
        key === "image" ? (
          <div key={index} className="container">
            <div className="key">{key}: </div>
            <div className="value">
              <button
                className="detailsInfoImage"
                onClick={() => window.open(obj[key], "_blank")}
                disabled={obj[key] === "N/A"}
                onMouseEnter={(event) => {
                  event.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(event) => {
                  event.target.style.textDecoration = "none";
                }}
              >
                View
              </button>
            </div>
          </div>
        ) : (
          <div key={index} className="container">
            <div className="key">{key}: </div>
            <div className="value">{obj[key]}</div>
          </div>
        )
      )}
    </div>
  );
}
