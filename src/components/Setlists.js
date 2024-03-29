import React, { useEffect, useState } from "react";
import userIcon from "../assets/acc image.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const { REACT_APP_API_URL } = process.env;
function Setlists() {
  const userEmail = localStorage.getItem("email");

  const api = axios.create({
    baseURL: REACT_APP_API_URL,
    withCredentials: true,
  });
  const [setlists, setSetlists] = useState([]);

  /** creates a new setlist and calls getallSetlists for rerender again */
  async function createSetlist(newSetlist) {
    try {
      await api.post(
        "/setlist/create-setlist",
        { name: newSetlist },
        { withCredentials: true }
      );
      getAllSetlists();
    } catch (error) {}
  }

  /** retrieves all setlists from the current user, sets the state for auto rerender */
  async function getAllSetlists() {
    try {
      const { data } = await api.get(`/setlist/getall-setlists/${userEmail}`, {
        withCredentials: true,
      });
      setSetlists(data);
    } catch (error) {}
  }

  useEffect(() => {
    getAllSetlists();
  }, [setlists?.length]);

  return (
    <div className="Setlists">
      <div className="user-icon">
        <Link className="user-icon-link" to="/user">
          <img src={userIcon} alt="user icon" />
        </Link>
      </div>

      <h1>Setlists</h1>

      {/** prints setlists from user, gained from custom hook usesetlistapi */}
      {setlists
        .sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        })
        .map((element) => (
          <Link
            key={element._id}
            className="list-item"
            to={`/setlist/${element._id}`}
          >
            {element.name}
          </Link>
        ))}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createSetlist(event.target.name.value);
          event.target.name.value = "";
        }}
      >
        <div className="add-item">
          <input name="name" placeholder="New Setlist Name"></input>
          <button type="submit">+</button>
        </div>
      </form>
    </div>
  );
}

export default Setlists;
