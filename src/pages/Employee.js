import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './Employee.module.scss';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    salary: "",
    airlineID: "",
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/employee/all");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSelectEmployee = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/employee/${id}`);
      if(selectedEmployee?.id===response.data.id){
        setSelectedEmployee(null)
        return
      }
      setSelectedEmployee(response.data);
    } catch (error) {
      console.error("Error selecting an employee:", error);
    }
  };

  const handleCreateEmployee = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/employee/create", form);
      setEmployees([...employees, response.data]);
      setForm({ firstName: "", lastName: "", salary: "", airlineID: "" });
    } catch (error) {
      console.error("Error creating an employee:", error);
    }
  };

  const handleUpdateEmployee = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:8080/api/employee/update/${id}`, form);
      const updatedEmployees = employees.map((employee) =>
        employee.id === id ? response.data : employee
      );
      setEmployees(updatedEmployees);
      setForm({ firstName: "", lastName: "", salary: "", airlineID: "" });
    } catch (error) {
      console.error("Error updating an employee:", error);
    }
  };
  const handleSalaryEmployee = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:8080/api/employee/salary/${id}`, form);
      const updatedEmployees = employees.map((employee) =>
        employee.id === id ? response.data : employee
      );
      setEmployees(updatedEmployees);
      setForm({ firstName: "", lastName: "", salary: "", airlineID: "" });
    } catch (error) {
      console.error("Error updating an employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employee/${id}`);
      const filteredEmployees = employees.filter(
        (employee) => employee.id !== id
      );
      setEmployees(filteredEmployees);
    } catch (error) {
      console.error("Error deleting an employee:", error);
    }
  };

  return (
    <div className={styles.container}>
        <h2>{selectedEmployee ? "Edit" : "Create"} mode</h2>

      <div  className={styles.formSection}>
        <input
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />
        <input
          type="text"
          placeholder="Airline ID"
          value={form.airlineID}
          onChange={(e) => setForm({ ...form, airlineID: e.target.value })}
        />
       {
        selectedEmployee
        ? <>
        <button className={styles.update} onClick={()=>handleUpdateEmployee(selectedEmployee.id)}>Update</button>
        <button className={styles.update} onClick={()=>handleSalaryEmployee(selectedEmployee.id)}>Salary</button>
        <button className={styles.delete} onClick={()=>handleDeleteEmployee(selectedEmployee.id)}>Delete</button>
        </>
        :
        <button onClick={()=>handleCreateEmployee()}>
           Create 
        </button>
       }
      </div>
      <ul className={styles.employeeList}>
        {employees.map((employee) => (
          <li
            key={employee.id}
            onClick={() => handleSelectEmployee(employee.id)}
          >
            {employee.firstname} {employee.lastname}
          </li>
        ))}
      </ul>
      {/* Selected Employee Details */}
      {selectedEmployee && (
        <div className={styles.employeeDetails}>
          <h2>Employee Details</h2>
          <p>ID: {selectedEmployee.id}</p>
          <p>
            Name: {selectedEmployee.firstname} {selectedEmployee.lastname}
          </p>
          <p>Salary: ${selectedEmployee.salary}</p>
        </div>
      )}

    </div>
  );
};

export default Employee;
