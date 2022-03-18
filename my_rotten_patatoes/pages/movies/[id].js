import {useRouter} from "next/router";
import NavBar from "../../components/NavBar";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import NewComment from "../../components/NewComment";
import RatingMovie from "../../components/Rating";

export default function Movies() {
    const router = useRouter();
    const {id} = router.query;
    const [pageId, setPageId] = useState(id);

    const [movie, setMovie] = useState([]);
    const [movieIsLoading, setMovieIsLoading] = useState(true);
    console.log("test page id ", pageId);
    useEffect(async () => {
        if (id) {
            await axios
                .get(
                    `https://api.themoviedb.org/3/movie/${pageId}?api_key=69f5d8f56d70c6805b84a794d3b1ccc0`
                )
                .then((response) => {
                    if (response.data.errors) {
                        console.log("Data not found, please check in few minutes");
                    } else {
                        setMovie(response.data);
                        setMovieIsLoading(false);
                    }
                })
                .catch((err) => {
                    console.log("error : ", err);
                });
        }
    }, [id]);

    function preventPage() {
        router.push("/");
    }

    return (
        <>

      {movieIsLoading ? (
                <p> loading in progress, please wait ....</p>
            ) : (<>
          <br />
          <div>
            <NavBar />
            <button type="button" onClick={preventPage}>
              Return
            </button>
            <div className="movieDetails">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                width={500}
                height={500}
              />
              <h1>{movie.title}</h1>
              <h4>Resume :</h4>
              <div>{movie.overview}</div>
              <br />
              <h4>Genres :</h4>
              <>
                {movie.genres.map((genre) => (
                  <p key={genre.id}>{genre.name}</p>
                ))}
              </>
              <br />
              <h4>Note :</h4>
              <div>{movie.vote_average}</div>
              <br />
              <h4>Release date :</h4>
              <div>{movie.release_date}</div>
              <br />
              <h4>Language :</h4>
              <div>{movie.original_language}</div>
                <div>
                                <h4>Differents Stats</h4>
                                <h6>Revenue in US $ (only in movie theater)</h6><p>{movie.revenue}</p>
                            </div>
            </div>
            <NewComment />
            
            <div>
              Le module de notation est fait mais les requêtes n aboutissent
              pas. Il semble que nous n ayons les autorisations
            </div>
          </div></>)}

        </>
    );
}
