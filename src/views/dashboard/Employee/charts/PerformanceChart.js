import { Box, useTheme } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts';

const PerformanceChart = () => {
    const chartRef = useRef(null);
    const theme = useTheme();

    // Dynamically get the axis text colors based on theme mode
    const axisTextColor = theme.palette.mode === 'light' ? '#64748b' : '#fff';
    const gridColor = theme.palette.mode === 'light' ? '#eaeaea' : 'rgb(35, 58, 87)';
    const tooltipBgColor = theme.palette.mode === 'light' ? '#FFFFFF' : '#333333'; // Dynamic tooltip background
    const tooltipTextColor = theme.palette.mode === 'light' ? '#333' : '#FFF'; // Dynamic tooltip text

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const options = {
                series: [{
                    name: "performance",
                    data: [20, 20, 35, 35, 40, 60, 60]
                }],
                grid: {
                    borderColor: gridColor, // Dynamic grid line color
                },
                chart: {
                    height: 273,
                    type: 'area',
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#03C95A'],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: '',
                    align: 'left'
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    labels: {
                        style: {
                            colors: axisTextColor, // Dynamic X-axis text color
                        },
                    },
                },
                yaxis: {
                    min: 10,
                    max: 60,
                    tickAmount: 5,
                    labels: {
                        formatter: (val) => {
                            return val / 1 + 'K'
                        },
                        style: {
                            colors: axisTextColor, // Dynamic X-axis text color
                        },
                    }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left'
                },
                tooltip: {
                    theme: theme.palette.mode, // Automatically applies 'light' or 'dark'
                    style: {
                        color: tooltipTextColor, // Tooltip text color
                    },
                    background: tooltipBgColor, // Tooltip background color
                },
                labels: ['Performance Chart'],
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

    return <Box ref={chartRef} id="performance_chart2"></Box>
}

export default PerformanceChart
