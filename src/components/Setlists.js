import React, { useEffect } from "react";
import userIcon from "../assets/acc image.png";
import { Link } from "react-router-dom";
import useSetlistAPI from "../customHooks/setlist.api";

function Setlists() {
  const { createSetlist } = useSetlistAPI();

  const [setlists, setSetlists] = React.useState([]);

  /** retrieves all setlists from the current user, sets the state for auto rerender */
  async function getAllSetlists() {
    try {
      const { data } = await api.get("setlist/getall-setlists", {
        withCredentials: true,
      });
      setSetlists(data);
    } catch (error) {}
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
