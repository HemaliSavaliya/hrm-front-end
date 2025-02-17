import { Box, useTheme } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts';

const SalesOverviewChart = () => {
    const chartRef = useRef(null);
    const theme = useTheme();

    // Dynamically get the axis text colors based on theme mode
    const axisTextColor = theme.palette.mode === 'light' ? '#6B7280' : '#fff';
    const gridColor = theme.palette.mode === 'light' ? '#E5E7EB' : 'rgb(35, 58, 87)';
    const tooltipBgColor = theme.palette.mode === 'light' ? '#FFFFFF' : '#333333'; // Dynamic tooltip background
    const tooltipTextColor = theme.palette.mode === 'light' ? '#333' : '#FFF'; // Dynamic tooltip text

    // Set bar colors based on theme mode
    const incomeColor = '#FF6F28';
    const expensesColor = theme.palette.mode === 'light' ? '#F8F9FA' : '#ffffff2b';

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const options = {
                chart: {
                    height: 290,
                    type: 'bar',
                    stacked: true,
                    toolbar: {
                        show: false,
                    }
                },
                colors: [incomeColor, expensesColor],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                plotOptions: {
                    bar: {
                        borderRadius: 5,
                        borderRadiusWhenStacked: 'all',
                        horizontal: false,
                        startingShape: 'rounded'
                    },
                },
                series: [{
                    name: 'Income',
                    data: [40, 30, 45, 80, 85, 90, 80, 80, 80, 85, 20, 80]
                }, {
                    name: 'Expenses',
                    data: [60, 70, 55, 20, 15, 10, 20, 20, 20, 15, 80, 20]
                }],
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    labels: {
                        style: {
                            colors: axisTextColor,
                            fontSize: '13px',
                        }
                    }
                },
                yaxis: {
                    labels: {
                        offsetX: -15,
                        style: {
                            colors: axisTextColor,
                            fontSize: '13px',
                        }
                    }
                },
                grid: {
                    borderColor: gridColor, // Dynamic grid line color
                    strokeDashArray: 5,
                    padding: {
                        left: -8,
                    },
                },
                legend: {
                    show: false
                },
                dataLabels: {
                    enabled: false // Disable data labels
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

    return <Box ref={chartRef} id="sales-income" mt={5}></Box>
}

export default SalesOverviewChart
