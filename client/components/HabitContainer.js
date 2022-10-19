import React, { Component } from 'react';
import HabitButtonContainer from './HabitButtonContainer';
import HabitGraph from './HabitGraph';

class HabitContainer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return <div>
      <HabitButtonContainer />
      <HabitGraph />
    </div>
  }
}

export default HabitContainer;