// frontend/src/pages/EmployeeList.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  async function load() {
    const res = await api.get('/employees');
    setEmployees(res.data);
  }

  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!confirm('Delete this employee?')) return;
    await api.delete(`/employees/${id}`);
    load();
  }

  return (
    <div style={{ maxWidth: 900, margin: '30px auto' }}>
      <h1>Employees</h1>
      <Link to="/create">Create Employee</Link>
      <table style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign:'left' }}>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map(e => (
            <tr key={e.id} style={{ borderTop: '1px solid #eee' }}>
              <td>{e.id}</td>
              <td>{e.firstName} {e.lastName}</td>
              <td>{e.email}</td>
              <td>{e.position}</td>
              <td>
                <Link to={`/edit/${e.id}`}>Edit</Link>
                <button onClick={() => remove(e.id)} style={{ marginLeft: 8 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
