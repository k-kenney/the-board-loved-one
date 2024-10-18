import React from "react";

import Clock, { DayOfWeek, WeatherComponent } from "./location-data/LocalData";
import Schedule from "./location-data/Schedule";

const HomePage = () => {
    return (
        <div>
            <div id="local-data">
                <div>
                    <Clock />
                </div>
                <div>
                    <DayOfWeek />
                </div>
                <div>
                    <WeatherComponent />
                </div>
            </div>

            <div id="reminder-list">
                <ul>
                    <li>You got COVID booster on 1/1/24</li>
                    <li>TV remote is on the coffee table</li>
                </ul>
            </div>

            <div id="main">
                <Schedule />
            </div>
        </div>
    );
};

export default HomePage;
removeEventListener;
