import React from "react";
import LogoImage from "../assets/logoGrey.png";
import QrCodeImage from "../assets/qr.png";
import LeftArrowImage from "../assets/left-arrow.png";

const SignUpPage = () => {
    return (
        <div id="sign-up-page">
            <a href="/login">
                <img src={LeftArrowImage} alt="Return Arrow" />
            </a>
            <div id="sign-up-header">
                <img src={LogoImage} alt="Logo" />
                <h2>The Board</h2>
            </div>

            <div id="sign-up-main">
                <h2>
                    Scan the QR code below to download the companion app to your
                    smartphone:
                </h2>
                <img src={QrCodeImage} alt="QR Code" />
                <p>
                    You can sign up for a new account in the mobile app once it
                    is installed and continue the setup process.
                </p>

                <button>Continue</button>
            </div>
        </div>
    );
};

export default SignUpPage;
