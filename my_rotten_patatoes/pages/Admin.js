import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import MoviesAdmin from "../components/MoviesAdmin";
import UsersDisplay from "../components/UsersDisplay";
import CommentsDisplay from "../components/CommentDisplay";
import { useState } from "react";
import axios from "axios";
import Search from "../components/FilterSearch/Search";

export default function Admin() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => setUsers(response.data.data));
    console.log("allUsers", users);
  }, []);
  return (
    <div>
      <NavBar />
      <>
        <div className="Admin">
          <h2>MOVIES</h2>
          <Search />
          <MoviesAdmin />
          <h2 >USERS</h2>
           <UsersDisplay/>
          <h2>COMMENTS</h2>
          <CommentsDisplay />
        </div>
      </>
    </div>
  );
}
