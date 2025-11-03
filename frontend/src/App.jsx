import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  // Fetch employees from backend
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/employees");
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Add new employee
  const addEmployee = async (e) => {
    e.preventDefault();
    if (!name || !role) return;

    try {
      const res = await fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role }),
      });

      if (res.ok) {
        await fetchEmployees();
        setName("");
        setRole("");
      } else {
        console.error("Failed to add employee");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const res = await fetch(`http://localhost:5000/employees/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Update UI instantly after deletion
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      } else {
        console.error("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="app-container">
      <h1>Employee Management</h1>
      <form onSubmit={addEmployee}>
        <input
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button type="submit">Add Employee</button>
      </form>

      <div className="employee-list">
        {employees.length === 0 ? (
          <p>No employees yet. Add one above!</p>
        ) : (
          employees.map((emp) => (
            <div key={emp.id} className="employee-card">
              <div className="employee-name">{emp.name}</div>
              <div className="employee-role">{emp.role}</div>
              <button
                className="delete-btn"
                onClick={() => deleteEmployee(emp.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
