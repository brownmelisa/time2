import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';

export default function TaskInput ({task}) {
  console.log("in task input component");
  console.log({task});
  return (
    <Container>
      <Row>
        <Col>{task.hours_worked}</Col>
        <Col>{task.job_code}</Col>
        <Col>{task.note}</Col>
      </Row>
    </Container>
  );
}
