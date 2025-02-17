import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { Box, useTheme } from '@mui/material';
import { getChartColorsArray } from './commonChartColor/chartUtils';

const HiredCandidatesChart = () => {
    const chartRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const chartColors = getChartColorsArray("hiredCandidates");

            // Dynamically get the axis text colors based on theme mode
            const strokeColor = theme.palette.mode === 'light' ? '#f1f5f9' : '#3a335a';

            if (chartColors && chartColors.length > 0) {
                const options = {
                    series: [25],
                    chart: {
                        height: 110,
                        type: 'radialBar',
                        sparkline: {
                            enabled: true
                        }
                    },
                    plotOptions: {
                        radialBar: {
                            hollow: {
                                margin: 0,
                                size: '50%',
                            },
                            track: {
                                background: strokeColor,
                                margin: 2,
                            },
                            dataLabels: {
                                show: false
                            }
                        }
                    },
                    grid: {
                        padding: {
                            top: -15,
                            bottom: -15
                        }
                    },
                    stroke: {
                        lineCap: 'round',
                        // Set the stroke (progress bar) color dynamically here
                        colors: [strokeColor] // Apply dynamic stroke color
                    },
                    labels: ['Hired Candidates'],
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

    return <Box ref={chartRef} id="hiredCandidates" data-chart-colors='["#43a594"]' sx={{ width: '100%', height: '100%' }}></Box>;
};

export default HiredCandidatesChart;
