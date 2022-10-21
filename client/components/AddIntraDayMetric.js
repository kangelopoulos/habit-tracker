import React from 'react';

const AddIntraDayMetric = props =>{
  return(
    <button id="addNewIntradayMetric" onClick={props.handlePopUpClick}>
      New Intraday Metric
    </button>
  )
}

export default AddIntraDayMetric;