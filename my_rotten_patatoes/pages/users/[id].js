import {useRouter} from 'next/router'
import NavBar from "../../components/NavBar";

import axios from "axios";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import DeleteUser from "../../components/DeleteUser";
import UpdateUser from "../../components/UpdateUser";

export default function Users() {



    const [user, setUser] = useState("");
    const router = useRouter();
    const {id} = router.query

    useEffect(()=> {
        if (id) {
            console.log("Id in UseEffect of User",router.query)
            axios.get(`http://localhost:3000/api/users/${id}`)
                .then(response => setUser(response.data.data));
        }
    },[id])

    return <>
        <br/>
        <div>
            <NavBar/>
            <div>User : {user.username}</div>
            <div>Email : {user.email}</div>
            <div>Role : {user.role}</div>
            <div>List of favoris movies: {user.favoris}</div>
            <br/>
            <UpdateUser/>
            <DeleteUser/>
        </div>
    </>
}
