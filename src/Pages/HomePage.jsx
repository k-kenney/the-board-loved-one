import { React, useState, useEffect } from "react";

import Clock, { DayOfWeek, WeatherComponent } from "./location-data/LocalData";
import Schedule from "./location-data/Schedule";
import { getLovedOneId, getConcerns, getTodaysEvents } from "../appwrite";

const HomePage = () => {
    const [concerns, setConcerns] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hard-coded number for now.
    const lovedOneKey = "1234";

    useEffect(() => {
        // Function to fetch concerns
        const fetchConcernsEvents = async () => {
            try {
                // Fetch loved one's ID
                const lovedOneId = await getLovedOneId(lovedOneKey);

                // Fetch concerns for that loved one
                const fetchedConcerns = await getConcerns(lovedOneId);

                // Update the state with the fetched concerns
                setConcerns(fetchedConcerns);

                // Fetch events for the loved one
                const fetchedEvents = await getTodaysEvents(lovedOneId);

                // Update state with fetched events
                setEvents(fetchedEvents);
            } catch (err) {
                // Handle any errors - not sure what we want to do here.
                console.error("Error:", err);
            } finally {
                setLoading(false); // Stop loading once the fetch is complete
            }
        };

        fetchConcernsEvents(); // Call the function inside useEffect when the component mounts
    }, [lovedOneKey]); // Runs whenever lovedOneKey changes

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    return (
        <div className="font-font">
            <div
                id="local-data"
                className="flex justify-between px-14 pb-1 pt-10"
            >
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

            <div
                id="reminder-list"
                className="bg-yellow text-center py-3 lg:text-2xl "
            >
                <ul>
                    {concerns.length > 0 ? (
                        concerns.map((concern) => (
                            <li className="py-1" key={concern.$id}>
                                • {concern.concern}{" "}
                            </li>
                        ))
                    ) : (
                        <li>No concerns found.</li>
                    )}
                </ul>
            </div>

            <div
                id="main"
                className="flex justify-center bg-lightBlue h-[75vh] py-4"
            >
                <Schedule />
            </div>
        </div>
    );
};

export default HomePage;
removeEventListener;
