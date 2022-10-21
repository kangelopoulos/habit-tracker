import React from 'react';
import '../assets/popup.scss';

const PopUp = props => {
  console.log(props);
  return(
    <div className="popup">
      <div className="innerDiv">
        <div className="popUpHeading"><h2>{props.type}</h2><button className="xOut"onClick={props.remove}>x</button></div>
        <label htmlFor="add">Name</label>
        <input id={props.popUpId} onChange={props.handleText} name="add" type="text"/>
        { props.type === 'Add Habit' ? <div className="radioButtonContainer">
          <div>
            <label htmlFor="good">Good</label>
            <input onClick={props.handleRadioClick} id="good" type="radio" name="good-bad" value="good" />
          </div>
          <div>
            <label htmlFor="bad">Bad</label>
            <input onClick={props.handleRadioClick} id="bad" type="radio" name="good-bad" value="bad" />
          </div>
        </div> : null}
        <button onClick={props.handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default PopUp;