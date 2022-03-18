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
    `https://api.themoviedb.org/3/search/movie?api_key=69f5d8f56d70c6805b84a794d3b1ccc0&language=en-US&page=1&include_adult=false&query=${query}`;

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
    console.log(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  }, []);

  const getYear = (date) => {
    const date2 = new Date(date);
    return date2.getFullYear().toString();
  };

  const getGenre = (genre) => {
    switch (genre) {
      case 28:
        return "Action";
      case 12:
        return "Adventure";
      case 16:
        return "Animation";
      case 35:
        return "Comedy";
      case 80:
        return "Crime";
      case 99:
        return "Documentary";
      case 18:
        return "Drama";
      case 10751:
        return "Family";
      case 14:
        return "Fantasy";
      case 36:
        return "History";
      case 10402:
        return "Music";
      case 9648:
        return "Mystery";
      case 10749:
        return "Romance";
      case 878:
        return "Science Fiction";
      case 10770:
        return "TV Movie";
      case 53:
        return "Thriller";
      case 10752:
        return "War";
        q;
      case 37:
        return "Western";
      case 27:
        return "Horror";
      default:
        return "Undefined";
    }
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
        placeholder="Search Movies AND Add to DB"
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
              genre_ids,
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
                {genre_ids.map((genre) => (
                  <span key={genre}>{getGenre(genre)} </span>
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
