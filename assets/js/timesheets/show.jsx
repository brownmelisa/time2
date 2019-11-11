import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {get_timesheet} from '../ajax';

function state2props(state, props) {
  console.log(props)
  let id = parseInt(props.id);
  return {id: id, timesheet: state.timesheets.get(id)};
}

function TimesheetsShow({id, timesheet}) {
  if (!timesheet) {
    get_timesheet(id);

    return (
      <div>
        <h1>Show Timesheet</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Show Timesheet</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Job Code</th>
            <th>Job Name</th>
            <th>Hours Worked</th>
            <th>Note</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td> {timesheet.jobCode} </td>
            <td> {timesheet.jobCode} </td>
            <td> {timesheet.hrsWorked} </td>
            <td> {timesheet.note} </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default connect(state2props)(TimesheetsShow);
