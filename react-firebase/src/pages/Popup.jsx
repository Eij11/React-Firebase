import React from "react";
import "./popup.css";

const Popup = (props) => {
  const { dataContact } = props; // Destructure the prop to access the data

  return props.trigger ? (
    <div className="pop-up">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          Close
        </button>
        <h3>
          <b>PopUp Test</b>
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
          laudantium. Adipisci quis beatae dolores distinctio nihil porro
          expedita quidem vel.
        </p>
        {props.children}

        <div className="container-contact-card">
          <div className="contact-card">
            <h3>{dataContact.name}</h3>
            <p>Email: {dataContact.email}</p>
            <p>Contact: {dataContact.contact}</p>
            <button onClick={() => navigate("/")}>Back</button>
            {/* Navigate back to home */}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
