import React from 'react';

export default function UserRow({user}) {
  return (

    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.is_manager}</td>
    </tr>
  );
}
