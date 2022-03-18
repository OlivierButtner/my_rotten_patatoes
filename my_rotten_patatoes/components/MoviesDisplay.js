import React, {useEffect, useState} from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import NewComment from "./NewComment";




export default function MoviesDisplay(props) {

    const {oneMovie} = props;
    const [movieData, setMovieData] = useState({});
    const [isLoadingMovie, setIsLoadingMovie] = useState(true);


    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${oneMovie}?api_key=${process.env.API_KEY}&language=en-US`
        })
            .then((response) => {
                if (response.data.errors) {
                    console.log("Data not found, please check in few minutes");
                } else {
                    setMovieData(response.data)
                    setIsLoadingMovie(false)
                }
            })
            .catch((err) => {
                console.log("error : ", err);
            })

    }, [])

    return (
        <>
            {isLoadingMovie ? (
                <p> loading in progress, please wait ....</p>
            ) : (
                <>
                    <div className="card">
                    <header>
                    <Link  href={`/movies/${movieData.id}`}>
                        <a><h2>{movieData.title}</h2></a>
                    </Link>
                    </header>
                    <Image src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} width={200} height={200}/>
                    <div className="content">
                    <h4 >Genre</h4>
                    <div className="GenreStyle"> {movieData.genres.map(genre => <p key={genre.id}>{genre.name}</p>)}</div>
                    <br/>
                    <h4>Vote Average</h4>
                    <footer>{movieData.vote_average}
                    </footer>
                    </div>
                    </div>
                </>
            )}
        </>
    )
}

