import React, {useState} from 'react';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

import Cookies from 'js-cookie';


const Log = ( props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  }
  return (
      <div className="connection-from">

            <div onClick={handleModals} id="register" className={signUpModal ? "active-btn-register" : null}>Sign Up</div>
            <div onClick={handleModals} id="login" className={signInModal ? "active-btn-register" : null}>Sign In</div>


          {signUpModal && <SignUpForm/>}
          {signInModal && <SignInForm/>}


      </div>
  );
};

export default Log;
