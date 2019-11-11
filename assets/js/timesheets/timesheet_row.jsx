import React from 'react';

export default function TimesheetRow({timesheet}) {
  return (

    <tr>
      <td>{timesheet.date}</td>
      <td>{timesheet.user_id}</td>
      <td>{timesheet.total_hours}</td>
      <td>{timesheet.status}</td>
    </tr>
  );
}
