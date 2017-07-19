import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder } from '../actions';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
    }
  }

  addReminder() {
    this.props.addReminder(this.state.text);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
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
                <div className = 'list-item'>{reminder.text}</div>
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
          </div>
          <button
            type = 'button'
            className = 'btn btn-success'
            onClick = {() => this.addReminder()}>
            Add Reminder
          </button>
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
  return bindActionCreators({addReminder, deleteReminder}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
