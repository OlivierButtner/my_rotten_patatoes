import {useRouter} from 'next/router'
import NavBar from "../../components/NavBar";

import axios from "axios";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import DeleteMovie from "../../components/DeleteMovie";

export default function Movies() {
    const router = useRouter()
    const {id} = router.query

    const [movie, setMovie] = useState([])

    useEffect(()=> {
        if(id){
            axios.get(`http://localhost:3000/api/movies/${id}`)
                .then(response => setMovie(response.data.data));

            console.log(movie);
        }
    },[id])
    return <>
        <br/>
        <div>
            <NavBar/>
            <Image src ={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  width={250} height={250}/>
            <h1>{movie.title}</h1>
            <div>{movie.API_id}</div>
                        <DeleteMovie id={movie.API_id}/>
        </div>
    </>
}
