// frontend/src/pages/EmployeeForm.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function EmployeeForm() {
  const [data, setData] = useState({ firstName:'', lastName:'', email:'', position:'' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    api.get(`/employees/${id}`).then(res => setData(res.data));
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    if (id) await api.put(`/employees/${id}`, data);
    else await api.post('/employees', data);
    navigate('/');
  }

  return (
    <div style={{ maxWidth: 700, margin: '30px auto' }}>
      <h1>{id ? 'Edit' : 'Create'} Employee</h1>
      <form onSubmit={submit}>
        <div><input placeholder="First name" value={data.firstName} onChange={e => setData({...data, firstName: e.target.value})} required /></div>
        <div><input placeholder="Last name" value={data.lastName} onChange={e => setData({...data, lastName: e.target.value})} required /></div>
        <div><input placeholder="Email" value={data.email} onChange={e => setData({...data, email: e.target.value})} required /></div>
        <div><input placeholder="Position" value={data.position} onChange={e => setData({...data, position: e.target.value})} /></div>
        <div><button type="submit">{id ? 'Update' : 'Create'}</button></div>
      </form>
    </div>
  );
}
    