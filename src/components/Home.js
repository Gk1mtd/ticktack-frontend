import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webm";

function Home() {
  return (
    <div className="Home">
      <h1>Metro-Know-Me</h1>
      <video muted={true} autoPlay={true} loop={true} src={logo} alt="logo2" />
      <Link className="link-button" to="/signup">
        Signup
      </Link>
      <br />
      <Link className="link-button" to="/login">
        Login
      </Link>
      <div className="info-text">
        <h2>What is it all about?</h2>
        <p>
          It will help to organize your setlist and also shows the BPM for each
          song.
        </p>
        <p>
          First Signup, then create a setlist. You can add songs in each
          setlist. Each song can have its own BPM.
        </p>
        <p>Thats Metro-Know-Me, an app for musicians.</p>
      </div>
    </div>
  );
}

export default Home;
