import React from "react";
import LogoImage from "../assets/logoGrey.png";
import SignUpPage from "./SignUpPage";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div id="login-page" className="font-font h-[75vh]">
            <div id="logo-image">
                <img src={LogoImage} alt="Logo Grey" />
            </div>

            <h1 className="text-5xl pb-10">The Board</h1>
            <button id="login-bt" className="text-1xl ">
                <Link to="/login-credentials">Login</Link>
            </button>
            <div id="sign-up-info" className="pt-5">
                <p>Don't have and account?</p>
                <Link className="pl-5 text-darkPurple" to="/sign-up">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
