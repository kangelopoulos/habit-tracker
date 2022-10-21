import { connect } from 'react-redux';
import React, { Component } from 'react';
import HabitButton from './HabitButton';
import '../assets/habitContainer.scss';
import HabitGraph from './HabitGraph';
import * as actions from '../actions/actions';
const mapStateToProps = state => ({
  habits: state.user.habits,
  user_id: state.user.user_id,
  completedHabits: state.habits.completedHabits,
})

const mapDispatchToProps = dispatch => ({
  loadHabits: obj => dispatch(actions.loadHabitsActionCreator(obj)),
  clickHabit: obj => dispatch(actions.clickHabitActionCreator(obj)),
})
class HabitContainer extends Component {
  constructor(props){
    super(props);
    this.handleHabitClick = this.handleHabitClick.bind(this);
  }

  handleHabitClick = event => {
    let weight = -1;
    console.log(event.target.classList);
    if(event.target.classList[0] == 'true') weight = 1;
    this.props.clickHabit({ name: event.target.innerHTML, id: event.target.id, weight: weight});
  }

  componentDidMount() {
    const day = new Date();
    const isoString = day.toISOString();

    const habitsObj = {};
    fetch(`metric/habit/day/${this.props.user_id}/${isoString}`)
      .then(data => data.json())
      .then(data => {
        data.habitsCompleted.forEach(e => {
          habitsObj[e.name] = { id: e.id, weight: e.weight }
        })
        this.props.loadHabits(habitsObj);
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    const completedHabitArr = [];
    for(const key in this.props.completedHabits){
      completedHabitArr.push({ name: key, id: this.props.completedHabits[key]['id'], weight: this.props.completedHabits[key]['weight'] })
    }
    if(completedHabitArr !== []) {
      console.log('trying to put habit');
      fetch(`metric/habit/day/${this.props.user_id}`,{
        method: 'PUT',
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify({
          habits: completedHabitArr,
          date: new Date()
        })
      })
    } 
  }

  render() {
    return (
      <div className="habitContainer">
        <h2>Log your habits</h2>
        <div className="habitButtonsContainer">
        {this.props.habits.map(e => {
          return (<div key={e.id}className="buttons">
            <HabitButton func={this.handleHabitClick} id={e.id} name={e.title} isGood={e.isGood}/>
          </div>)
        }
        )}
        </div>
        <HabitGraph user_id={this.props.user_id}/>
      </div>
    )
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitContainer);