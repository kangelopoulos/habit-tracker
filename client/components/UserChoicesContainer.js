import React, { Component } from 'react';
import AddHabit from './AddHabit';
import AddDailyMetric from './AddDailyMetric';
import AddIntraDayMetric from './AddIntraDayMetric';
import '../assets/userChoices.scss';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import PopUp from './PopUp';

const mapStateToProps = state => ({
  firstName: state.user.firstName,
  popUp: state.popUp.showPopUp,
  type: state.popUp.type,
  user_id: state.user.user_id,
  popUpId: state.popUp.id,
  habitName: state.habits.habitName,
  isGood: state.habits.isGood,
})

const mapDispatchToProps = dispatch =>({
  showPopUp: (popup) => dispatch(actions.popupActionCreator(popup)),
  removePopUp: (type) => dispatch(actions.closePopupActionCreator(type)),
  updateHabitName: (name) => dispatch(actions.newHabitActionCreator(name)),
  updateIsGood: (str) => dispatch(actions.isGoodActionCreator(str)),
  addHabit: (habit) => dispatch(actions.addHabitActionCreator(habit)),
})

class UserChoicesContainer extends Component {
  constructor(props){
    super(props);
    this.handlePopUpClick = this.handlePopUpClick.bind(this);
    this.handleRemovePopUpClick = this.handleRemovePopUpClick.bind(this);
    this.handleTextUpdate = this.handleTextUpdate.bind(this);
    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRemovePopUpClick(event) {
    this.props.removePopUp(1);
  }

  handlePopUpClick(event) {
    this.props.showPopUp({
      type: event.target.innerHTML,
      id: event.target.id,
    });
  } 

  handleRadioClick(event) {
    this.props.updateIsGood(event.target.id);
  }

  handleTextUpdate(event) {
    console.log('handle')
    switch(event.target.id){
      case 'addNewHabit':
        this.props.updateHabitName(event.target.value);
      default:
        break;
    }
  }

  handleSubmit(event) {
    if(this.props.isGood === '' || this.props.habitName === ''){
      alert('Please fill out all fields');
    } else {
      console.log(this.props.user_id);
      fetch(`/habit/${this.props.user_id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          "habit": this.props.habitName,
          "isGood": this.props.isGood,
        })
      })
        .then(data => data.json())
        .then(data => {
          console.log(data);
          if(data) this.props.addHabit(data);
          else(alert('You can\'t add the same habit twice.'))
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render(){
    return(
      <div className="userChoicesContainer" id="user-choices">
        <h1>Welcome, {this.props.firstName}</h1>
        <div className="userChoiceButtons">
          <AddHabit addHabitSeen={this.props.addHabitSeen} handlePopUpClick={this.handlePopUpClick} />
          <AddDailyMetric handlePopUpClick={this.handlePopUpClick} />
          <AddIntraDayMetric handlePopUpClick={this.handlePopUpClick} />
        </div>
        { this.props.popUp ? <PopUp handleRadioClick={this.handleRadioClick} handleText={this.handleTextUpdate} 
            remove={this.handleRemovePopUpClick} popUpId={this.props.popUpId} handleSubmit={this.handleSubmit}
            type={this.props.type}/> : null }
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChoicesContainer)