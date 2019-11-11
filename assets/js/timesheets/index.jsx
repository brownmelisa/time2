import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { list_timesheets } from '../ajax';
import { Table, Button, Alert } from 'react-bootstrap';
import TaskInput from "./task_input";
import TimesheetRow from "./timesheet_row";

let TimesheetsList = connect(({timesheets}) => ({timesheets}))(({timesheets}) => {
  console.log("timesheet size is");
  console.log(timesheets);
  console.log(timesheets.size);
  if (timesheets.size == 0) {
    list_timesheets();
  }

  // console.log(timesheets[Entries]);
  let rows = _.map([...timesheets], ([_, timesheet]) => {
    console.log(timesheet);
    return <TimesheetRow key={timesheet.id} timesheet={timesheet} />;
  });

  return (
    <div>
    <h1>Timesheets</h1>
      <Table striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Worker Name</th>
            <th>Hours Worked</th>
            <th>Status</th>
         </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </div>
  );
});

export default TimesheetsList;
