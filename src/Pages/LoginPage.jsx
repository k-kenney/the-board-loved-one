import React from "react";
import LogoImage from "../assets/logoGrey.png";
import SignUpPage from "./SignUpPage";

const LoginPage = () => {
    return (
        <div id="login-page">
            <div id="logo-image">
                <img src={LogoImage} alt="Logo Grey" />
            </div>

            <h1 className="text-5xl pb-10">The Board</h1>
            <button id="login-bt" className="text-1xl ">
                Login
            </button>
            <div id="sign-up-info" className="pt-5">
                <p>Don't have and account?</p>
                <a className="pl-5" href="/sign-up">
                    Sign Up
                </a>
            </div>
        </div>
    );
};

export default LoginPage;
