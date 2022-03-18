import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import MoviesAdmin from "../components/MoviesAdmin";
import UsersDisplay from "../components/UsersDisplay";
import CommentsDisplay from "../components/CommentDisplay";
import { useState } from "react";
import axios from "axios";
import FilterByDate from "../components/FilterSearch/FilterByDate";
import FilterByGenre from "../components/FilterSearch/FilterByGenre";
import MoviesDisplay from "../components/MoviesDisplay";

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
        <div>
          <FilterByDate />
          <FilterByGenre />
        </div>

      </>
    </div>
  );
}
