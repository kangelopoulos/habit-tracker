import React, { Component } from 'react';
import HabitContainer from './HabitContainer';
import Login from './Login';
import { connect } from 'react-redux';
import UserChoicesContainer from './UserChoicesContainer';
import '../assets/all.scss'

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
});

export class App extends Component {
  constructor(props){
    super(props);
  }
  // conditional rendering on whether the user is loggedIn
  render() {
    return <div>
      {this.props.loggedIn ? <div><UserChoicesContainer /><HabitContainer /></div> : <Login />}
    </div>
  }
}

export default connect(mapStateToProps)(App)