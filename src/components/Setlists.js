import React, { useEffect, useState } from "react";
import userIcon from "../assets/acc image.png";
import { Link } from "react-router-dom";
import axios from "axios";

const { REACT_APP_API_URL } = process.env;
const api = axios.create({
  baseURL: REACT_APP_API_URL,
  withCredentials: true,
});

function Setlists() {
  const [setlists, setSetlists] = useState([]);
  const [errors, setErrors] = useState("");

  /** creates a new setlist and calls getallSetlists for rerender again */
  async function createSetlist(newSetlist) {
    try {
      await api.post(
        "/setlist/create-setlist",
        { name: newSetlist },
        { withCredentials: true }
      );
      getAllSetlists();
    } catch (error) {
      setErrors(errors);
    }
  }

  /** retrieves all setlists from the current user, sets the state for auto rerender */
  async function getAllSetlists() {
    try {
      const { data } = await api.get("/setlist/getall-setlists", {
        withCredentials: true,
      });
      setSetlists(data);
      setErrors(data);
    } catch (error) {
      setErrors(errors);
    }
  }

  useEffect(() => {
    getAllSetlists();
  }, [setlists.length]);

  return (
    <div className="Setlists">
      <div className="user-icon">
        <Link className="user-icon-link" to="/user">
          <img src={userIcon} alt="user icon" />
        </Link>
      </div>

      <h1>Setlists</h1>
      <div>{JSON.stringify(errors)}</div>
      {/** prints setlists from user, gained from custom hook usesetlistapi */}
      {setlists.map((element) => (
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
