import React, { useState } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => {
      let [loading, setLoading] = useState(true);
  return (
    <div className="sweet-loading text-center" style={{marginTop:'150px'}}>

      <ScaleLoader
        color='black'
        loading={loading}
        size='150px'
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Loader;