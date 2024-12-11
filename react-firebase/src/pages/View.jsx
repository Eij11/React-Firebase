import React, { useState, useEffect } from "react";
import { database, ref, get } from "../firebase.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./view.css";

const initialContactState = {
  name: "",
  email: "",
  contact: "",
};

const View = () => {
  const [dataContact, setDataContact] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactRef = ref(database, `Contacts/${id}`);
        const snapshot = await get(contactRef); // Fetch data for the specific contact
        if (snapshot.exists()) {
          setDataContact(snapshot.val()); // Set the fetched data
        } else {
          toast.error("No data found for the given ID.");
        }
      } catch (error) {
        toast.error("Error fetching contact data:", error);
      }
    };

    if (id) fetchContact(); // Call the function if an ID exists
  }, [id]);

  if (!dataContact) {
    return <p>Loading contact data...</p>; // Show loading state while fetching
  }

  return (
    <div className="container-contact-card">
      <div className="contact-card">
        <h3>{dataContact.name}</h3>
        <p>Email: {dataContact.email}</p>
        <p>Contact: {dataContact.contact}</p>
        <button onClick={() => navigate("/")}>Back</button>
        {/* Navigate back to home */}
      </div>
    </div>
  );
};

export default View;
