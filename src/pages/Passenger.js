import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Passenger.module.scss"; // Ensure you have corresponding SCSS styles

const Passenger = () => {
  const [passengers, setPassengers] = useState([]);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    passportNumber: "",
    contactInfo: "",
  });

  const fetchPassengers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/passenger/all"
      );
      setPassengers(response.data);
    } catch (error) {
      console.error("Error fetching passengers:", error);
    }
  };

  useEffect(() => {
    fetchPassengers();
  }, []);

  const handleSelectPassenger = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/passenger/${id}`
      );
      if (selectedPassenger?.id === response.data.id) {
        setSelectedPassenger(null);
        return;
      }
      setSelectedPassenger(response.data);
    } catch (error) {
      console.error("Error selecting a passenger:", error);
    }
  };

  const handleCreatePassenger = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/passenger/create",
        form
      );
      setPassengers([...passengers, response.data]);
      setForm({
        firstName: "",
        lastName: "",
        passportNumber: "",
        contactInfo: "",
      });
    } catch (error) {
      console.error("Error creating a passenger:", error);
    }
  };

  const handleUpdatePassenger = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/passenger/${id}`,
        form
      );
      const updatedPassengers = passengers.map((passenger) =>
        passenger.id === id ? response.data : passenger
      );
      setPassengers(updatedPassengers);
      setForm({
        firstName: "",
        lastName: "",
        passportNumber: "",
        contactInfo: "",
      });
    } catch (error) {
      console.error("Error updating a passenger:", error);
    }
  };

  const handleDeletePassenger = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/passenger/${id}`);
      const filteredPassengers = passengers.filter(
        (passenger) => passenger.id !== id
      );
      setPassengers(filteredPassengers);
    } catch (error) {
      console.error("Error deleting a passenger:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{selectedPassenger ? "Edit" : "Create"} mode</h2>
        <div className={styles.formSection}>
          {/* Form Inputs */}
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
            placeholder="Passport Number"
            value={form.passportNumber}
            onChange={(e) =>
              setForm({ ...form, passportNumber: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Contact Info"
            value={form.contactInfo}
            onChange={(e) => setForm({ ...form, contactInfo: e.target.value })}
          />

          {/* Add buttons for create, update, and delete */}
          {selectedPassenger ? (
            <>
              <button
                className={styles.update}
                onClick={() => handleUpdatePassenger(selectedPassenger.id)}
              >
                Update
              </button>
              <button
                className={styles.delete}
                onClick={() => handleDeletePassenger(selectedPassenger.id)}
              >
                Delete
              </button>
            </>
          ) : (
            <button
              className={styles.create}
              onClick={() => handleCreatePassenger()}
            >
              Create
            </button>
          )}
        </div>
      <ul className={styles.passengerList}>
        {passengers.map((passenger) => (
          <li
            key={passenger.id}
            onClick={() => handleSelectPassenger(passenger.id)}
          >
            {passenger.firstname} {passenger.lastname}
          </li>
        ))}
      </ul>
      {selectedPassenger && (
        <div className={styles.passengerDetails}>
          {selectedPassenger && (
            <div className={styles.passengerDetails}>
              <h2>Passenger Details</h2>
              <p>ID: {selectedPassenger.id}</p>
              <p>
                Name: {selectedPassenger.firstName} {selectedPassenger.lastName}
              </p>
              <p>Passport Number: {selectedPassenger.passportNumber}</p>
              <p>Contact Info: {selectedPassenger.contactInfo}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Passenger;
