import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { list_users } from '../ajax';
import { Table, Button, Alert } from 'react-bootstrap';
import UserRow from "./user_row";

let TimesheetsList = connect(({users}) => ({users}))(({users}) => {
  console.log("printing out users");
  console.log(users);
  if (users.size == 0) {
    console.log("listing users")
    list_users();
  }

  // console.log(timesheets[Entries]);
  let rows = _.map([...users], ([_, user]) => {
    console.log(user);
    return <UserRow key={user.id} user={user} />;
  });

  return (
    <div>
      <h1>Users</h1>
      <Table striped>
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Is Manager</th>
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
