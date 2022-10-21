import React from 'react';


const AddHabit = props => {
  return(
    <div>
      <button id="addNewHabit" onClick={props.handlePopUpClick}>
        Add Habit
      </button>
    </div>

  )
}

export default AddHabit;