import {useRouter} from 'next/router'
import NavBar from "../../components/NavBar";

import axios from "axios";
import React, {useEffect, useState} from "react";
import Image from "next/image";

export default function Users() {
    const router = useRouter()
    const {id} = router.query

    const [comment, setComment] = useState([])

    useEffect(()=> {
        if (id) {
            axios.get(`http://localhost:3000/api/comments/${id}`)
                .then(response => setComment(response.data.data));

            console.log(comment._id);
        }
    },[router])

    return <>
        <br/>
        <div>
            <NavBar/>
            <div>User : </div>
            <div>Email : </div>

            <div>Comment: {comment.content}</div>

        </div>
    </>
}
