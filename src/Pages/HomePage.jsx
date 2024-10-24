import { useState, useEffect } from "react";
import Clock, { DayOfWeek, WeatherComponent } from "./location-data/LocalData";
import { getLovedOneId, getConcerns, getTodaysEvents } from "../appwrite";

const HomePage = () => {
    const [concerns, setConcerns] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hard-coded number for now.
    const lovedOneKey = "1234";

    useEffect(() => {
        // Function to fetch concerns and events
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
                // Handle any errors
                console.error("Error:", err);
            } finally {
                setLoading(false); // Stop loading once the fetch is complete
            }
        };

        fetchConcernsEvents(); // Call the function inside useEffect when the component mounts
    }, [lovedOneKey]); // Runs whenever lovedOneKey changes

    if (loading) {
        return <p>Loading...</p>;
    }

    // Create the array of events.
    let event_list = events.map((event) => {
        const timeString = event.start_time;
        // Convert the timeString (in UTC) to a Date object
        const eventDate = new Date(timeString);
        // Extract the hours and minutes in local time.
        let hours = eventDate.getHours();
        const minutes = eventDate.getMinutes();
        // Convert to 12-hour format and handle AM/PM
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12; // Convert 0 or 12-hour to 12, and rest to 1-11
        // Format minutes to always have two digits
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        // Construct the time string without a leading zero in the hour
        const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;
        return (
            <li key={event.$id}>
                {formattedTime} - {event.title}
            </li>
        );
    });

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
                className="flex justify-center text-black bg-lightBlue h-[75vh] py-4"
            >
                <div
                    id="schedule"
                    className="bg-blue border-4 border-gray rounded-lg w-[90%] p-5"
                >
                    <h2 className="text-2xl mb-4 py-3 lg:text-4xl">
                        Today's Schedule
                    </h2>
                    <div className="grid grid-cols-2 gap-8 lg:text-2xl">
                        {/* First column */}
                        <ul>
                            {event_list
                                .slice(0, Math.ceil(event_list.length / 2))
                                .map((event, index) => (
                                    <li
                                        key={event.$id}
                                        className=" text-black mb-2 py-3"
                                    >
                                        {event}
                                    </li>
                                ))}
                        </ul>

                        {/* Second column */}
                        <ul>
                            {event_list
                                .slice(Math.ceil(event_list.length / 2))
                                .map((event, index) => (
                                    <li
                                        key={event.$id}
                                        className="text-black mb-2 py-3"
                                    >
                                        {event}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* <div
                id="main"
                className="flex justify-center bg-lightBlue h-[75vh] py-4"
            >
                <div
                    id="schedule"
                    className="bg-blue border-4 border-gray rounded-lg w-[90%] p-5"
                >
                    <h2 className="text-2xl mb-4 py-3 lg:text-4xl">
                        Today's Schedule
                    </h2>

                    <ul>{event_list}</ul>
                </div>
            </div> */}
        </div>
    );
};

//---------------test below

export default HomePage;
