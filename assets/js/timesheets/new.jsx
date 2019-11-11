import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import {Form, Button, Alert, Col, Container, Row, Grid} from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_new_timesheet } from '../ajax';
// import TaskInput from "./task_input";
import _ from "lodash";
import TimesheetRow from "./timesheet_row";

function state2props(state) {
  return state.forms.new_timesheet;
}

class TimesheetsNew extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
    }
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  changed(data) {
    console.log("printing out data in changed", data);
    this.props.dispatch(
      {type: 'CHANGE_NEW_TIMESHEET',
        data: data,
      });
  }

  task_changed(ev, indx, fld) {
    let input = ev.target.value;
    console.log("input is:", input);
    console.log(indx);
    console.log(fld);
    this.changed({tasks: input});
  }

  add_blank_task(ev) {
    console.log("in blanks task");
  }

  render() {
    let {date, status, total_hours, user_id, tasks, errors, dispatch} = this.props;
    console.log("printing out initial props", this.props);
    console.log(tasks);
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{ errors }</Alert>;
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    // render a row for each task in the tasks list
    let rows = tasks.map(task => {
      console.log(task);
      console.log("print out key", tasks.indexOf(task));
      return <TaskInput
        key={tasks.indexOf(task)}
        ii={tasks.indexOf(task)}
        task={task}
        handle_task_change={this.task_changed}
        add_blank_task={this.add_blank_task}
      />;
    });

    return (
      <div>
        <h1>New Time Sheet</h1>
        { error_msg }

        <Form>
          <Form.Row>
            <Col md="4">
              <Form.Group>
                <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(ev) => this.changed({date: ev.target.value}) }/>
              </Form.Group>
            </Col>
          </Form.Row>

          {rows}

          <Form.Row >
            Total Hours:
          </Form.Row>
          <br />

          <Form.Group controlId="submit">
            <Button variant="primary"
                    onClick={() => submit_new_timesheet(this)}>
              Submit Time Sheet
            </Button>
          </Form.Group>
        </Form>
      </div>
   );
  }
}

function TaskInput (props) {
  let {ii, task, handle_task_change, add_blank_task} = props;
  console.log("in task input component");
  console.log({task});
  console.log({props});
  return (
      <Form.Row>
        <Col md="1">
        <Form.Group controlId="hoursWorkedSelect" aria-label="hours worked">
          <Form.Label>Hours</Form.Label>
          <Form.Control
            as="select"
            placeholder="select"
            onChange={(ev) => handle_task_change(ev, {ii}, "hours_worked")} >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Form.Control>
        </Form.Group>
        </Col>

        <Col md="3">
        <Form.Group as={Col} controlId="jobCodeSelect" aria-label="job code">
          <Form.Label>Job Code</Form.Label>
          <Form.Control
            as="select"
            placeholder="select"
            onChange={(ev) => handle_task_change(ev, {ii}, "job_code")}>
            <option value="select">select</option>
            <option>VAOR-01</option>
            <option>VAOR-02</option>
            <option>VAOR-03</option>
            <option>VAOR-04</option>
          </Form.Control>
        </Form.Group>
        </Col>

        <Col md="6">
        <Form.Group as={Col} controlId="noteInput" aria-label="note">
          <Form.Label>Note</Form.Label>
          <Form.Control onChange={(ev) => handle_task_change(ev, {ii}, "note")}/>
        </Form.Group>
        </Col>

        <Col md="2">
          <Button id="add_task_btn1" variant="primary" onClick={(ev) => add_blank_task(ev)}>
            add task
          </Button>
        </Col>
      </Form.Row>
  );
}


export default connect(state2props)(TimesheetsNew);
