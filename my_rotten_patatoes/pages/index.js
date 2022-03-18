import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MoviesDisplay from "../components/MoviesDisplay";
import Link from "next/link";
import Cookies from "js-cookie";
const Token = Cookies.get('access_token')
export default function Home() {
  const [top_movies, setTop_movies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await axios({
      method: "GET",
      url: `http://localhost:3000/api/movies`,
    })
      .then((response) => {
        if (response.data.errors) {
          console.log("Data not found, please check in few minutes");
        } else {
          setTop_movies(response.data.data);
          console.log("response", response.data.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }, []);
  console.log(top_movies);
  useEffect(() => {
    console.log("test en sortie :", top_movies);
  }, [top_movies]);

  return (
    <>
      <Head>
        <title>RottenPatatoes</title>
      </Head>
      <NavBar />

      <>
        {Token ?
            <div className="cards">
                {top_movies.map((movie) => {
                    return (
                        <div key={movie.API_id}>
                            <MoviesDisplay oneMovie={movie.API_id} />
                        </div>
                    );
                })}
            </div> :
            <Link href="/profil" >
                <button className="btn-validation">Sign In or Sign Up !!!</button>
            </Link>}

      </>
    </>
  );
}
