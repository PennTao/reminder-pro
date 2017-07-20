import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment  from 'moment';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: '',
    }
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  deleteAllReminders() {
    this.props.deleteAllReminders();
  }
  renderReminder() {
    const { reminders } = this.props;
    return (
      <ul className = 'list-group col-sm-4'>
        {
          reminders.map(reminder => {
            return (
              <li key = {reminder.id}
                className = 'list-group-item'>
                <div className = 'list-item'>
                  <div>{reminder.text}</div>
                  <div>{moment(new Date(reminder.dueDate)).fromNow()}</div>
                </div>
                <div className = 'list-item delete-button'
                  onClick = {() => this.deleteReminder(reminder.id)}>
                  &#x2715;
                </div>
              </li>
            );
          })
        }
      </ul>
    )
  }

  render(){
    return (
      <div className = 'App'>
        <div className = 'title'>
          Reminder Pro in App.jsx
        </div>
        <div className = 'form-inline reminder-form'>
          <div className = 'form-group'>
            <input
              className = 'form-control item-input'
              placeholder = 'I have to...'
              onChange = {event => this.setState({
                text: event.target.value
              })}
            />
            <input
              className = 'form-control item-input'
              type = 'datetime-local'
              onChange = {event => this.setState({
                dueDate: event.target.value
              })}
            />
          </div>
          <div className = 'btn-group'>
            <button
              type = 'button'
              className = 'btn btn-success item-button'
              onClick = {() => this.addReminder()}>
              Add Reminder
            </button>
            <button
              type = 'button'
              className = 'btn btn-danger item-button'
              onClick = {() => this.deleteAllReminders()}>
              Remove All Reminders
            </button>
          </div>
        </div>
        { this.renderReminder() }
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    reminders: state
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addReminder, deleteReminder, deleteAllReminders}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
