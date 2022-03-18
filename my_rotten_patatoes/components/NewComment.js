import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import jwt from "jsonwebtoken";
import cookieCutter from "cookie-cutter";

const NewComment = () => {
    const [form, setForm] = useState({content: String});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const {movieId} = router.query;
    const token = cookieCutter.get("access_token");
    console.log("token : ", token);
    const decoded = jwt.verify(token, "myrottentomatoes");

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createComment().then();
            } else {
                setIsSubmitting(false);
            }
        }
        // console.log("donnes le nom du token: ", token);
        // console.log("donnes le nom du id: ", decoded);
    }, [errors]);

    const createComment = async () => {
        try {
            const res = await axios({
                method: "POST",
                url: "http://localhost:3000/api/comments",
                data: {
                    movie_id: movieId,
                    user_id: decoded.id,
                    content: form.content,
                },
            });
            await router.push("/");
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const validate = () => {
        let err = {};
        if (!form.content) {
            err.content = "Comment is required";
        }
        return err;
    };
    return (
        <div className="comment-container">
            <h1>Post</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        aria-label="content"
                        placeholder="add your comment"
                        name="content"
                        onChange={handleChange}
                    />
                    <button type="submit">Post your comment</button>
                </form>
            </div>
        </div>
    );
};

export default NewComment;
