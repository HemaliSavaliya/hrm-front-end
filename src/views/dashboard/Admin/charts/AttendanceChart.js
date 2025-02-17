import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = () => {
    const data = {
        labels: ["Late", "Present", "Permission", "Absent"],
        datasets: [
            {
                label: "Attendance",
                data: [40, 20, 30, 10], // Values for each segment
                backgroundColor: ["#0C4B5E", "#03C95A", "#FFC107", "#E70D0D"], // Colors
                borderWidth: 5,
                borderColor: "#fff",
                cutout: "60%", // Creates the semi-donut effect
            },
        ],
    };

    const options = {
        rotation: -100, // Rotates the chart
        circumference: 200, // Limits the doughnut to a semi-circle
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: -20, // Set to 0 to remove top padding
                bottom: -20, // Set to 0 to remove bottom padding
            }
        },
        plugins: {
            legend: { display: false }, // Hides legend
        },
    };

    return <Doughnut data={data} options={options} />
}

export default AttendanceChart
