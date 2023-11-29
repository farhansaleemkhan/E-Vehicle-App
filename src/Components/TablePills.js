import React, { useState } from "react";
import { useEffect } from "react";

export default function TablePill({ value }) {
  const [color, setColor] = useState("");

  useEffect(() => {
    handlePillColor(value);
  }, [value]);

  const handlePillColor = (value) => {
    switch (value) {
      case "Completed":
        setColor("#008000");
        break;

      case "Booked":
        setColor("#0000FF");
        break;

      default:
        setColor("#000000");
        break;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: color,
        color: "black",
        padding: "0.5rem 0.5rem",
        borderRadius: "0.3rem",
        columnGap: "0.5rem",
        height: "24px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "0.8rem",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {value}
      </div>
    </div>
  );
}
