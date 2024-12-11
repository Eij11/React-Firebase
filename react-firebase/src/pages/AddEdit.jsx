import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./addedit.css";

import { database, ref, onValue, push, update } from "../firebase.js";
import { toast } from "react-toastify";

const initialContactState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [addContactState, setAddContactState] = useState(initialContactState);
  const [dataContacts, setDataContacts] = useState({});
  const { name, email, contact } = addContactState;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const dataContactsRef = ref(database, "Contacts");

    // Real-time listener for data
    onValue(dataContactsRef, (snapshot) => {
      const data = snapshot.val(); // Fetch all contacts
      setDataContacts(data || {}); // Set data or empty object
    });
  }, []);

  useEffect(() => {
    if (id && dataContacts[id]) {
      setAddContactState({ ...dataContacts[id] }); // Populate form if editing
    } else {
      setAddContactState({ ...initialContactState }); // Reset form for new entry
    }
  }, [id, dataContacts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddContactState({ ...addContactState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !contact) {
      toast.error("Please input values on each provided field!");
      return;
    }

    const contactsRef = ref(database, "Contacts");

    try {
      if (id) {
        // Update existing contact
        const contactRef = ref(database, `Contacts/${id}`);
        await update(contactRef, addContactState);
        toast.success("Contact Updated Successfully!");
      } else {
        // Add new contact
        await push(contactsRef, addContactState);
        toast.success("Contact Added Successfully!");
      }
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name..."
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email..."
          value={email || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter Contact..."
          value={contact || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
