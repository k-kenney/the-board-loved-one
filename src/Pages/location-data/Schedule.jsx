import React from "react";

function Schedule() {
    // Array of activities with time
    const schedule = [
        { time: "07:00 AM", activity: "Wake up" },
        { time: "07:15 AM", activity: "Get dressed" },
        { time: "08:00 AM", activity: "Take morning pills" },
        { time: "08:05 AM", activity: "Eat Breakfast" },
        { time: "09:30 AM", activity: "Dr. Smith appointment" },
        { time: "12:00 AM", activity: "Eat Lunch" },
        { time: "01:00 AM", activity: "Physical Therapy Appoinment" },
        { time: "03:00 AM", activity: "Grandson Brian vist" },
        { time: "04:00 AM", activity: "Watch Oprah" },
        { time: "05:00 AM", activity: "Eat Dinner" },
    ];

    // Split the schedule into two halves for two columns
    const firstHalf = schedule.slice(0, Math.ceil(schedule.length / 2));
    const secondHalf = schedule.slice(Math.ceil(schedule.length / 2));

    return (
        <div
            id="schedule"
            className="bg-blue border-4 border-gray rounded-lg w-[90%] p-5"
        >
            <h2 className="text-2xl mb-4 lg:text-3xl">Today's Schedule</h2>
            <div className="grid grid-cols-2 gap-4 lg:text-2xl">
                {/* First Column */}
                <ul>
                    {firstHalf.map((item, index) => (
                        <li key={index} className="mb-2">
                            {item.time} - {item.activity}
                        </li>
                    ))}
                </ul>

                {/* Second Column */}
                <ul>
                    {secondHalf.map((item, index) => (
                        <li key={index} className="mb-2">
                            {item.time} - {item.activity}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Schedule;
