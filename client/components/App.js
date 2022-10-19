import React, { Component } from 'react';
import HabitContainer from './HabitContainer';
import Login from './Login';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn
});

export class App extends Component {
  constructor(props){
    super(props);
  }
  // conditional rendering on whether the user is loggedIn
  render() {
    return <div>
      {this.props.loggedIn ? <HabitContainer /> : <Login />}
    </div>
  }
}

export default connect(mapStateToProps)(App)