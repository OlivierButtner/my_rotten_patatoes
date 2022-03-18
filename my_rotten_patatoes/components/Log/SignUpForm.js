import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const usernameError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
        ".password-confirm.error"
    );

    passwordConfirmError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
            "Les mots de passe ne correspondent pas";

    } else {
      await axios({
        method: "post",
        url: `http://localhost:3000/api/auth/signUp`,
        data: {
          username,
          email,
          password,
        },
      })
          .then((res) => {
            console.log(res);
            if (res.data.errors) {
              usernameError.innerHTML = res.data.errors.username;
              emailError.innerHTML = res.data.errors.email;
              passwordError.innerHTML = res.data.errors.password;
            } else {
              setFormSubmit(true);
            }
          })
          .catch((err) => console.log(err));
    }
  };

  return (
      <>
        {formSubmit ? (
            <>
              <SignInForm />
              <span></span>
              <h4 className="success">
                You win friend, you can login!
              </h4>
            </>
        ) : (
            <form action="" onSubmit={handleRegister} id="sign-up-form">
              <label htmlFor="username">Username</label>
              <br />
              <input
                  type="text"
                  name="pseudo"
                  id="pseudo"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
              />
              <div className="username error"></div>
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
              />
              <div className="email error"></div>
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
              />
              <div className="password error"></div>
              <br />
              <label htmlFor="password-conf">Confirm Password</label>
              <br/>
              <input
                  type="password"
                  name="password"
                  id="password-conf"
                  onChange={(e) => setControlPassword(e.target.value)}
                  value={controlPassword}
              />
              <div className="password-confirm error"></div>
              <br />

              <button className="btn-validation" type="submit">Register</button>
            </form>
        )}
      </>
  );
};

export default SignUpForm;
