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
    `http://localhost:3000/api/movies/filterByGenre?genre=${query}`;

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

  const getYear = (date) => {
    const date2 = new Date(date);
    return date2.getFullYear().toString();
  };

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

  const handleClick = (e) => {
    const date = getYear(e.release_date);
    const tab = e.genre_ids;
    const array = [];
    for (let i = 0; i < tab.length; i++) {
      array.push(getGenre(tab[i]));
    }
    console.log(array);
    axios({
      method: "POST",
      url: "http://localhost:3000/api/movies",
      data: {
        title: e.title,
        API_id: e.id,
        Genre: array,
        release_date: date,
        overview: e.overview,
        poster_path: e.poster_path,
        vote_average: e.vote_average,
        // production_companies: form.production_companies,
      },
    }).then((res) => {
      console.log(res.data.success);
      if (res.data.success == false) {
        alert("Le film est déja enregistré dans la base");
      } else {
        alert("enregistrement réussi");
      }
    });
  };

  return (
    <div className={styles.container} ref={searchRef}>
      <input
        className={styles.search}
        onChange={onChange}
        onFocus={onFocus}
        placeholder="Filter by Genre"
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
                {/* <Link href="/posts/[id]" as={`/posts/${id}`}> */}
                <p className="Pre">
                  <span className="titre">{title}</span>
                  {" // "}
                  {getYear(release_date)}
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

                <button
                  className="addMovie"
                  onClick={() =>
                    handleClick({
                      id,
                      title,
                      release_date,
                      genre_ids,
                      poster_path,
                      overview,
                      vote_average,
                    })
                  }
                >
                  Add Movie
                </button>

                {/* </Link> */}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
