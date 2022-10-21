import { connect } from 'react-redux';
import React from 'react';

const mapStateToProps = state => ({
  completedHabits: state.habits.completedHabits,
});

const HabitButton = props => {
  let clicked = ''
  if(props.completedHabits[props.name]) clicked = 'clicked'
  return(
    <button id={props.id} onClick={props.func} className={props.isGood.toString()+ ' ' + 'habitButton' + ' ' + clicked}>{props.name}</button>
  )
}

export default connect(mapStateToProps, )(HabitButton);