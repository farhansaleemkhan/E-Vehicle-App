import React from "react";

export default function DetailsIcon({ value, data, handler }) {
  return (
    <div className="frcc">
      <span style={{ paddingRight: ".4rem" }}>{value}</span>
      <img src="/details.svg" alt="detail-icon" width={15} height={15} onClick={() => handler(data)} />
    </div>
  );
}
