import React, { Component } from 'react'
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'


class CalendarView extends Component {
  constructor(props){
    super(props)

  }

  componentDidMount() {
    this.fetchCalendar()
  }

  fetchCalendar() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin ],
      defaultView: 'dayGridWeek',
      events: '/api/events'
    });

    calendar.render();
  }

  render() {
    return (
      <div className="col-md-8">
        <div id="calendar"></div>
      </div>
    );
  }
}

export default CalendarView
