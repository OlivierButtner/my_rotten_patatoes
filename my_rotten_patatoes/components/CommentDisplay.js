import React, {useEffect} from 'react';
import Image from "next/image";
import axios from "axios";
import {useState} from "react";
import Link from "next/link";

export default function CommentsDisplay() {
    const [comments, setComments] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/comments')
            .then(response => setComments(response.data.data));
        console.log("allComments", comments);
    }, [])
    return (
        <div>
            <ul>
                {comments.map(comment =>
                    <li key={comment._id}>
                        <div className="CommentAdmin">
                        <Link href={`/comments/${comment._id}`}>
                            <a>
                                <h3>{comment.content}</h3>
                            </a>
                        </Link>
                        {/*<div>{comment.email}</div>*/}
                        </div>
                    </li>)}
            </ul>
        </div>
    );
};
