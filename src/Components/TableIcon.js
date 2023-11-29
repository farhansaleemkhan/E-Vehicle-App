import React from "react";

export default function TableIcon({ value, handler, data }) {
  const { id, url } = value;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        columnGap: "0.5rem",
      }}
    >
      {id && id}
      <img src={url} alt="delete" width={30} height={30} onClick={() => handler(data)} />
    </div>
  );
}
