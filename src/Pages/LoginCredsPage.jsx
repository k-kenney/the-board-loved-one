import React from "react";
import LeftArrowImage from "../assets/left-arrow.png";
import LogoImage from "../assets/logoGrey.png";

const LoginCredsPage = () => {
    return (
        <div>
            <div id="sign-up-page" className="font-font">
                <a href="/login">
                    <img src={LeftArrowImage} alt="Return Arrow" />
                </a>
                <div id="sign-up-header">
                    <img src={LogoImage} alt="Logo" />
                    <h2>The Board</h2>
                </div>
                <h3 className="text-4xl w-2/3 mt-[-40px] pb-[60px] ">
                    Use the link below to go online and log in. Once completed,
                    this screen will update.
                </h3>
                <div>
                    <h5 id="step-one" className="py-3 pl-2">
                        1. Log in online by going to:
                    </h5>
                    <p id="login-link" className="text-2xl pb-3">
                        theboa.rd/active
                    </p>
                    <h5 id="dtrp-two" className="py-3 pl-2">
                        2. Enter the activation code when prompted:
                    </h5>
                    <p id="activation-code" className="text-2xl pb-3">
                        XJ5PL7
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginCredsPage;
