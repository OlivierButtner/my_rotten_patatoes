import React from "react";
import styles from "../styles/Home.module.css";
import Log from "./Log";
import Link from "next/link";
import Cookies from "js-cookie";
import Logout from "./Log/Logout";
import Image from "next/image";

const Token = Cookies.get('access_token')
const NavBar = () => {
    return (
        <div>
            <div className={styles.NavBar}>
                <div>
                    <Link href="/">
                        <a className="TITLE">ROTTEN POTATOES</a>
                    </Link>
                </div>
                <div>
                    {Token ? <div></div> : <Link href="/profil">Register/Login</Link>}
                </div>
                <div>
                    {Token ? <Link href="/Admin">Admin</Link> : <div></div>}
                </div>

                <div>
                    {Token ? <button className="Logout"><Logout/></button> : <div></div>}
                </div>
            </div>
            <div>
                <ul className={styles.NavBar2}>
                    <li>
                        {Token ? <Link href="/Filter">SEARCH MOVIE</Link> : <div></div>}
                    </li>
                    <li>

                    </li>


                </ul>
            </div>
        </div>
    );
};

export default NavBar;
