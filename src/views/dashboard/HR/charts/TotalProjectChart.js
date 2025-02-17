import { Box, useTheme } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts';
import { getChartColorsArray } from './commonChartColor/chartUtils';

const TotalProjectChart = () => {
    const chartRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const chartColors = getChartColorsArray("totalProjectChart");

            // Dynamically get the axis text colors based on theme mode
            const axisTextColor = theme.palette.mode === 'light' ? '#64748b' : '#fff';
            const legendTextColor = theme.palette.mode === 'light' ? '#3b3b3b' : '#e0e0e0';
            const gridColor = theme.palette.mode === 'light' ? '#eaeaea' : 'rgb(35, 58, 87)';
            const tooltipBgColor = theme.palette.mode === 'light' ? '#FFFFFF' : '#333333'; // Dynamic tooltip background
            const tooltipTextColor = theme.palette.mode === 'light' ? '#333' : '#FFF'; // Dynamic tooltip text

            if (chartColors && chartColors.length > 0) {
                const options = {
                    series: [{
                        name: 'New',
                        data: [44, 55, 41, 67, 22, 43, 14, 55, 41,]
                    }, {
                        name: 'Pending',
                        data: [13, 23, 20, 8, 13, 27, 8, 20, 8,]
                    }, {
                        name: 'Completed',
                        data: [11, 17, 15, 15, 21, 14, 24, 11, 17,]
                    }, {
                        name: 'Rejected',
                        data: [21, 7, 25, 13, 22, 8, 13, 7, 25,]
                    }],
                    chart: {
                        type: 'bar',
                        height: 350,
                        stacked: true,
                        zoom: {
                            enabled: true
                        },
                        toolbar: {
                            show: false,
                        },
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            borderRadius: 10,
                            columnWidth: '25%',
                        },
                    },
                    grid: {
                        borderColor: gridColor, // Dynamic grid line color
                        padding: {
                            top: -15,
                            bottom: 5,
                            right: 0,
                        }
                    },
                    xaxis: {
                        categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09'],
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
                    dataLabels: {
                        enabled: false
                    },
                    colors: getChartColorsArray("totalProjectChart"),
                    legend: {
                        position: 'bottom',
                        labels: {
                            colors: legendTextColor, // Dynamic legend text color
                        },
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        theme: theme.palette.mode, // Automatically applies 'light' or 'dark'
                        style: {
                            color: tooltipTextColor, // Tooltip text color
                        },
                        background: tooltipBgColor, // Tooltip background color
                    },
                    labels: ['Total Projects'],
                    colors: chartColors
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

    return <Box ref={chartRef} id="totalProjectChart" data-chart-colors='["#3b82f6", "#eab308", "#2dbda3", "#f87171"]' sx={{ width: '100%', height: '100%' }}></Box>
}

export default TotalProjectChart
