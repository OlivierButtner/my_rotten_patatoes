import React, {useEffect} from 'react';
import Image from "next/image";
import axios from "axios";
import {useState} from "react";
import Link from "next/link";

export default function UsersDisplay(){
    const [users, setUsers] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:3000/api/users')
            .then(response => setUsers(response.data.data));
        console.log("allUsers",users);
    },[])
    return (
        <div >
            <ul className="UsersAdmin">
                { users.map( user =>
                    <li key={user._id}>
                        <div className="UserAdmin">
                        <Link href={`/users/${user._id}`}>
                            <a>
                                <h3>{user.username}</h3>
                            </a>
                        </Link>
                        <div>{user.email}</div>
                        </div>
                    </li>)}
            </ul>
        </div>
    );
};
/*
{
    "_id": "61ded563c1da5092e865d4e7",
    "email": "vincent@mail.fr",
    "username": "vincent",
    "password": "$2a$10$H3Ocm9SLHaj13sz39vYgseS4/W1/bOKP3gC5RJZsClMU49qoS/EP2",
    "favoris": [],
    "role": "Basic",
    "createdAt": "2022-01-12T13:19:31.658Z",
    "updatedAt": "2022-01-12T13:19:31.658Z",
    "__v": 0
},*/
