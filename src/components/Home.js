import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webm";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

function Home() {
  // wakeup server!
  const api = axios.create({
    baseURL: REACT_APP_API_URL,
    withCredentials: true,
  });
  async function getSetlist() {
    try {
      await api.get(`/setlist/get-setlist/${0}`);
    } catch (error) {}
  }
  useEffect(() => {
    getSetlist();
  });

  return (
    <div className="Home">
      <h1>Clickbeat</h1>
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
        <p>Thats Clickbeat, an app for musicians.</p>
        <iframe
          width="50%"
          height="315"
          src="https://www.youtube-nocookie.com/embed/D7-929Xh8yo"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen="true"
        ></iframe>
      </div>
    </div>
  );
}

export default Home;
