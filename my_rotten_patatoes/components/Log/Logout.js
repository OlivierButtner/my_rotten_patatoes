import React from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const Logout = () => {

    const ButtonLogout = () => {
        Cookies.remove('access_token');
        localStorage.clear();
        window.location.reload(false)
    }
    return <div className="logoutNavigation">

        <div onClick={ButtonLogout} >Logout</div>

    </div>
}

export default Logout;
