import React, {useEffect, useState} from 'react';


import Logout from "../components/Log/Logout";
import Cookies from "js-cookie";
import NavBar from "../components/NavBar";
import Log from "../components/Log";

const Token = Cookies.get('access_token')

const Profil = () => {

    Cookies.get('access_token')


    return (
        <div>
            <NavBar/>
            <div className="profil-page">
                {Token ? <h1></h1> : (
                    <div className="log-container">
                       <Log/>
              </div>
                )}
            </div>
        </div>
    );
};

export default Profil;
