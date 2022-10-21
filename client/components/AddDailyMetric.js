import React from 'react';

const AddDailyMetric = props =>{
  return(
    <button id="addNewDailyMetric" onClick={props.handlePopUpClick}>
      New Daily Metric
    </button>
  )
}

export default AddDailyMetric;