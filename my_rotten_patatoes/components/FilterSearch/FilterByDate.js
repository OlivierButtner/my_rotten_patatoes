import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import styles from "../../styles/search.module.css";
import Image from "next/image";
import axios from "axios";

export default function Search() {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const searchEndpoint = (query) =>
    `http://localhost:3000/api/movies/filterByDate?date=${query}`;

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
    console.log(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.data);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  return (
    <div className={styles.container} ref={searchRef}>
      <input
        className={styles.search}
        onChange={onChange}
        onFocus={onFocus}
        placeholder="Filter By Year"
        type="text"
        value={query}
      />
      {active && results.length > 0 && (
        <div className={styles.results}>
          {results.map(
            ({
              id,
              title,
              release_date,
              poster_path,
              Genre,
              overview,
              vote_average,
            }) => (
              <div className={styles.result} key={id}>
                <p className="Pre">
                  <span className="titre">{title}</span>
                  {" // "}
                  {release_date}
                </p>
                <p>{overview}</p>
                {Genre.map((genre) => (
                  <span key={genre}>{genre} </span>
                ))}
                <Image
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  width={250}
                  height={250}
                  alt={title}
                />

                {/* </Link> */}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
