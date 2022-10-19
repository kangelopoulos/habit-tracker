import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

/**
 * 
 *  Login 
 *  - accepts three props, username and password, and loggedIn
 *  - user and password automatically update in state as the user types
 *  - when the user clicks submit 
 */

// username, password
const mapStateToProps = state => ({
  username: state.login.username,
  password: state.login.password,
});

// setUsernameActionCreator, setPasswordActionCreator
const mapDispatchToProps = dispatch => ({
  setUsername: (username) => dispatch(actions.setUsernameActionCreator(username)),
  setPassword: (password) => dispatch(actions.setPasswordActionCreator(password)),
  loginAttempt: (authenticated) => dispatch(actions.loginAttemptActionCreator(authenticated))
});

const Login = props => {
  // on a change in the username text box, change the username state
  const handleUsernameChange = event =>{
    props.setUsername(event.target.value);
  };

  // on a change in the password text box, change the password state
  const handlePasswordChange = event =>{
    props.setPassword(event.target.value);
  };

  // on a username/password submit - attempt a login
  const handleSubmit = () => {
    /**
     * Make a fetch request to /user passing in username and password
     * as parameters.
     */
    fetch(`/user/${props.username}/${props.password}`)
        .then(data => data.json())
        .then(data => {
          if(data) props.loginAttempt(true);
          else props.loginAttempt(false);
        });
  };
  return(
    <div id="login">
      <label htmlFor="username">Username: </label>
      <input onChange={handleUsernameChange} type="text" name="username" placeholder="Username"/>
      <label htmlFor="password" name="password">Password: </label>
      <input onChange={handlePasswordChange} type="text" name = "password" placeholder="password"/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)