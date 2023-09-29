import React, { useState } from "react";

function DetailsContainer({ title, showDropdown = false, children }) {
  const [dropDown, showdropDown] = useState(showDropdown);

  const handleDropdown = () => {
    showdropDown(!dropDown);
  };

  return (
    <div className="details-container">
      <div className="container1" onClick={() => handleDropdown()}>
        <div className="details-container-heading">
          <p>{title}</p>
        </div>
        {dropDown ? (
          <img src="/down arow.svg" alt="arrow" width={15} height={15} />
        ) : (
          <img src="/arrow-up.svg" alt="arrow" width={15} height={15} />
        )}
      </div>
      {dropDown ? <div className="details-container-body">{children}</div> : null}
    </div>
  );
}

export default DetailsContainer;
