import React, { useState, useEffect } from "react";
import { database, ref, onValue, child, remove } from "../firebase.js";
import { Link } from "react-router-dom";

import "./home.css";
import { toast } from "react-toastify";

import Popup from "./Popup.jsx";

const Home = () => {
  /*
  use state hooks, sets data whether they have a vale or null
  same sa pop up trigger na bool
  */
  const [dataContacts, setDataContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null); // State to hold selected contact // IPAsa na popup
  const [dataCount, setDataCount] = useState(0);
  const [popupTrigger, setPopupTrigger] = useState(false);

  /*
  Like onValue sa app, it listens data changes sa FB sa Contacts node
  setDataContacts -  put them on an array list
  setDataCount - gets the count of all the data
  */
  useEffect(() => {
    const dataContactsRef = ref(database, "Contacts"); //firebase rtdb reference

    // Real-time listener for data
    onValue(dataContactsRef, (snapshot) => {
      const data = snapshot.val(); // Get data from the snapshot
      if (data) {
        const contactsArray = Object.keys(data).map((key) => ({
          id: key, // Unique key for each contact
          ...data[key], // Contact details
        }));
        setDataContacts(contactsArray);
        setDataCount(Object.keys(data).length);
      } else {
        setDataContacts([]); // No data, set an empty array
        setDataCount(0); // Reset the count
      }
    });
  }, []);

  /*
  Logic ng delete
  */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you want to delete this contact?")) {
      try {
        // Reference to the specific child node to remove
        await remove(child(ref(database, "Contacts"), id));
        toast.success("Contact successfully deleted!");
      } catch (error) {
        toast.error(`Failed to delete contact: ${error.message}`);
      }
    }
  };

  const handleEdit = (id) => {};

  /*
  Locates the contact using its ID and sets it in selectedContact.
  Activates the popup by setting popupTrigger to true.
  */
  const handleView = (id) => {
    const contact = dataContacts.find((data) => data.id === id); // Find the contact by ID
    setSelectedContact(contact); // Set the selected contact
    setPopupTrigger(true); // Trigger the popup
  };

  /*
  Renders the data into a TABLE; see below forda card
  */
  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataContacts.map((dataContact, index) => (
            <tr key={dataContact.id}>
              <td>{index + 1}</td>
              <td>{dataContact.name}</td>
              <td>{dataContact.email}</td>
              <td>{dataContact.contact}</td>
              <td>
                <Link to={`/update/${dataContact.id}`}>
                  <button
                    onClick={() => handleEdit(dataContact.id)}
                    className="btn btn-edit"
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(dataContact.id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>

                {/* <Link to={`/view/${dataContact.id}`}>
                  <button
                    onClick={() => handleView(dataContact.id)}
                    className="btn btn-view"
                  >
                    View
                  </button>
                </Link> */}

                <button
                  onClick={() => handleView(dataContact.id)}
                  className="btn btn-view"
                >
                  View
                </button>
              </td>
              {/* Action Buttons */}
            </tr>
          ))}
        </tbody>
      </table>

      <Popup
        trigger={popupTrigger}
        setTrigger={setPopupTrigger}
        dataContact={selectedContact} // Pass the selected contact data
      />
    </div>
  );
};

export default Home;

// {/* DISPLAYS VIA CARD */}
// {dataContacts.map((dataContact) => (
//   <div key={dataContact.id}>
//     <h3>{dataContact.name}</h3>
//     <p>{dataContact.email}</p>
//     <p>{dataContact.contact}</p>
//   </div>
// ))}
