import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

class Form extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-4">
        <div className='form-group'>
          <label>Event Name</label><br />
          <input
            type='text'
            name='title'
            className='form-control'

            value={this.props.title}
            onChange={(e) => this.props.handleInputs(e)}
          />
          </div>
          <div className='form-group'>
            <label>Start</label><br />
            <DatePicker
              selected={ this.props.startDate }
              onChange={ (e) => this.props.handleStartDate(e)}
              name='startDate'
              className='form-control'
              dateFormat='yyyy-MM-dd'
            />
          </div>
          <div className='form-group'>
            <label>End</label><br />
            <DatePicker
              selected={ this.props.endDate }
              onChange={ (e) => this.props.handleEndDate(e) }
              name='endDate'
              className='form-control'
              dateFormat='yyyy-MM-dd'
            />
          </div>
          <div className='form-group'>
            {
              this.props.daysOfWeek.map((item, i) => (
                <label key={item.name}>
                {item.name}
                  <input className='dows'
                         type='checkbox'
                         name={item.name}
                         value={item.value}
                         onChange={(e) => this.props.handleCheckbox(e) } />
                </label>
              ))
            }
          </div>

          <div className='form-group'>
            <button onClick={this.props.handleSubmit} className='btn btn-primary'>Add</button>
          </div>
      </div>
    );
  }
}

export default Form
