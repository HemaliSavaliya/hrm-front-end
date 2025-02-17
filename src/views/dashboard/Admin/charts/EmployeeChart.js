import { Box, useTheme } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts';

const EmployeeChart = () => {
    const chartRef = useRef(null);
    const theme = useTheme();

    // Dynamically get the axis text colors based on theme mode
    const axisTextColor = theme.palette.mode === 'light' ? '#111827' : '#fff';
    const gridColor = theme.palette.mode === 'light' ? '#E5E7EB' : 'rgb(35, 58, 87)';
    const tooltipBgColor = theme.palette.mode === 'light' ? '#FFFFFF' : '#333333'; // Dynamic tooltip background
    const tooltipTextColor = theme.palette.mode === 'light' ? '#333' : '#FFF'; // Dynamic tooltip text

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const options = {
                chart: {
                    height: 220,
                    type: 'bar',
                    padding: {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    },
                    toolbar: {
                        show: false,
                    }
                },
                colors: ['#FF6F28'],
                grid: {
                    borderColor: gridColor, // Dynamic grid line color
                    strokeDashArray: 5,
                    padding: {
                        top: -20,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }
                },
                plotOptions: {
                    bar: {
                        borderRadius: 5,
                        horizontal: true,
                        barHeight: '35%',
                        endingShape: 'rounded',
                        startingShape: 'rounded'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                series: [{
                    data: [80, 110, 80, 20, 60, 100],
                    name: 'Employee'
                }],
                xaxis: {
                    categories: ['UI/UX', 'Development', 'Management', 'HR', 'Testing', 'Marketing'],
                    labels: {
                        style: {
                            colors: axisTextColor,
                            fontSize: '13px',
                        }
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: axisTextColor, // Dynamic X-axis text color
                        },
                    }
                },
                tooltip: {
                    theme: theme.palette.mode, // Automatically applies 'light' or 'dark'
                    style: {
                        color: tooltipTextColor, // Tooltip text color
                    },
                    background: tooltipBgColor, // Tooltip background color
                },
            };

            if (chartRef.current) {
                const chart = new ApexCharts(chartRef.current, options);
                chart.render();

                return () => {
                    chart.destroy();
                };
            }
        }
    }, [theme.palette.mode]);

    return <Box ref={chartRef} id="emp-department"></Box>
}

export default EmployeeChart
