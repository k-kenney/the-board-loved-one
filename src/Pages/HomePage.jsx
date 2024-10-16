import React from "react";
import Clock, { DayOfWeek, WeatherComponent } from "./location-data/clock";

const HomePage = () => {
    return (
        <div>
            <h2 className="text-center text-5xl">The Board</h2>
            <div className="flex justify-between border border-blue-500">
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
        </div>
    );
};

export default HomePage;
removeEventListener;
