import React, {useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie'


const SignInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:3000/api/auth/login", {
                username,
                password,
            })
            .then((res) => {
                Cookies.set('access_token',res.data.access_token);

                window.location = "/";
            })
            .catch((err) => {
                console.log(err);
            });

    };

    return (
        <form onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="username">Username</label>
            <br/>
            <input
                type="text"
                name="username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <div className="username error"></div>
            <br/>
            <label htmlFor="password">Password</label>
            <br/>
            <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <br/>
            <button className="btn-validation" type="submit">Login</button>
        </form>
    );
};

export default SignInForm;
