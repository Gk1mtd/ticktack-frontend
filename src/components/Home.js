import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webm";

function Home() {
  return (
    <div className="Home">
      <h1>Clickbeat</h1>
    <h2>Hi, Metroknowme was in need of a faster server and a new name. You can just follow this Link down there</h2>
      <video muted={true} autoPlay={true} loop={true} src={logo} alt="logo2" />
      <Link className="link-button" to="https://clickbeat.netlify.app">
        go to Clickbeat.app here
      </Link>
    </div>
  );
}

export default Home;
