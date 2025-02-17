import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { Box, useTheme } from '@mui/material';
import { getChartColorsArray } from './commonChartColor/chartUtils';

const ApplicationReceivedChart = () => {
    const chartRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
        // Ensure this code runs only on the client-side
        if (typeof window !== 'undefined') {
            const chartColors = getChartColorsArray("applicationReceivedChart");

            // Dynamically get the axis text colors based on theme mode
            const axisTextColor = theme.palette.mode === 'light' ? '#64748b' : '#fff';
            const legendTextColor = theme.palette.mode === 'light' ? '#3b3b3b' : '#e0e0e0';
            const gridColor = theme.palette.mode === 'light' ? '#eaeaea' : 'rgb(35, 58, 87)';
            const tooltipBgColor = theme.palette.mode === 'light' ? '#FFFFFF' : '#333333'; // Dynamic tooltip background
            const tooltipTextColor = theme.palette.mode === 'light' ? '#333' : '#FFF'; // Dynamic tooltip text

            if (chartColors && chartColors.length > 0) {
                const options = {
                    series: [{
                        name: 'Total Application',
                        type: 'area',
                        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
                    }, {
                        name: 'Hired Candidates',
                        type: 'line',
                        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
                    }],
                    chart: {
                        height: 315,
                        type: 'line',
                        stacked: false,
                        margin: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        },
                        toolbar: {
                            show: false,
                        },
                    },
                    stroke: {
                        width: [2, 2],
                        curve: 'smooth'
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '50%'
                        }
                    },
                    fill: {
                        opacity: [0.03, 1],
                        gradient: {
                            inverseColors: false,
                            shade: 'light',
                            type: "vertical",
                            opacityFrom: 0.85,
                            opacityTo: 0.55,
                            stops: [0, 100, 100, 100]
                        }
                    },
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    colors: getChartColorsArray("applicationReceivedChart"),
                    markers: {
                        size: 0
                    },
                    grid: {
                        borderColor: gridColor, // Dynamic grid line color
                        padding: {
                            top: -15,
                            right: 0,
                        }
                    },
                    tooltip: {
                        theme: theme.palette.mode, // Automatically applies 'light' or 'dark'
                        style: {
                            color: tooltipTextColor, // Tooltip text color
                        },
                        background: tooltipBgColor, // Tooltip background color
                        shared: true,
                        intersect: false,
                        y: {
                            formatter: function (y) {
                                if (typeof y !== "undefined") {
                                    return y.toFixed(0) + " points";
                                }
                                return y;

                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            colors: legendTextColor, // Dynamic legend text color
                        },
                    },
                    xaxis: {
                        labels: {
                            style: {
                                colors: axisTextColor, // Dynamic X-axis text color
                            },
                        },
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: axisTextColor, // Dynamic Y-axis text color
                            },
                        },
                    },
                };

                if (chartRef.current) {
                    const chart = new ApexCharts(chartRef.current, options);
                    chart.render();

                    return () => {
                        chart.destroy();
                    };
                }
            } else {
                console.warn("Chart colors are undefined or empty");
            }
        }
    }, [theme.palette.mode]);

    return <Box ref={chartRef} id="applicationReceivedChart" data-chart-colors='["#3b82f6","#249782"]' sx={{ width: '100%', height: '100%' }}></Box>;
};

export default ApplicationReceivedChart;
