import React, { useState, useEffect } from "react";
import { database, ref, onValue, child } from "../firebase.js";
import { Link, useParams, useNavigate } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
};

export default About;
