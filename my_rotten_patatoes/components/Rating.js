import axios from "axios";
import {useDebugValue} from "react";

export default function RatingMovie(props) {
    const {oneMovie} = props;


    function sendRate() {
        axios({
            method: 'POST',
            url:`https://api.themoviedb.org/3/movie/${oneMovie}/rating?api_key=${process.env.API_KEY}`,
            data: {
                "value": value
            }
        })
            .then((response) => {
                alert("Rate send !")
            })
            .catch((err) => {
                console.log("error : ", err);
            })
    }

    return (

        <form onClick={RatingMovie}>
            <input type='number' name="inputRate" value={data.value} min={0} max={10}/>
        </form>
    )
}