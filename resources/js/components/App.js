import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Form from './Form';
import CalendarView from './CalendarView';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      startDate: new Date(),
      endDate: new Date(),
      dow: [],
      randomKey: 0
    }
    this.handleEventSubmit = this.handleEventSubmit.bind(this)
  }

  handleInputs(e) {
    this.setState({
      title: e.target.value
    })
  }

  handleStartDate(date) {
    this.setState({
      startDate: date
    })
  }

  handleEndDate(date) {
    this.setState({
      endDate: date
    })
  }

  formatDate(date) {
    var dt = new Date(date),
        month = '' + (dt.getMonth() + 1),
        day = '' + dt.getDate(),
        year = dt.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  clearFields() {
    var cbarray = document.getElementsByClassName('dows');
    for(var i = 0; i < cbarray.length; i++){
      cbarray[i].checked = "false";
    }

    this.setState({title: '', startDate: new Date(), endDate: new Date()})
  }

  handleCheckbox(e) {
    if(!e.target.checked) {
      var array = [...this.state.dow]
      var index = array.indexOf(e.target.value)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({
          dow: array
        })
      }
    } else {
      this.state.dow.push(e.target.value)
    }
  }

  handleEventSubmit() {
    const event = {
      title: this.state.title,
      start_recur: this.formatDate(this.state.startDate),
      end_recur: this.formatDate(this.state.endDate),
      daysOfWeek: this.state.dow
    }

    axios.post('/api/events', event)
    .then(response => {
      this.setState({ randomKey: Math.random() })
      this.clearFields()
    })
    .catch(error => {
      this.setState({
        errors: error.response.data.errors
      })
    })
  }

  render() {
    const checkboxes = [
      {
        name: 'Mon',
        value: 1
      },
      {
        name: 'Tue',
        value: 2
      },
      {
        name: 'Wed',
        value: 3
      },
      {
        name: 'Thu',
        value: 4
      },
      {
        name: 'Fri',
        value: 5
      },
      {
        name: 'Sat',
        value: 6
      },
      {
        name: 'Sun',
        value: 0
      }
    ];

    return (
    <div className="container">
      <h3>Calendar</h3>
      <div className="row justify-content-center">
        <Form
         handleCheckbox={e => this.handleCheckbox(e)}
         dow={this.state.dow}
         daysOfWeek={checkboxes}
         title={this.state.title}
         startDate={this.state.startDate}
         endDate={this.state.endDate}
         handleStartDate={(e) => this.handleStartDate(e)}
         handleEndDate={(e) => this.handleEndDate(e)}
         handleInputs={(e) => this.handleInputs(e)}
         handleSubmit={this.handleEventSubmit} />
        <CalendarView key={this.state.randomKey} />
      </div>
    </div>
    );
  }
}


export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
