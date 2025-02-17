import React from "react";
import { Card, CardHeader, CardContent, Typography, Box, Divider } from "@mui/material";
import dynamic from "next/dynamic";
const SalesOverviewChart = dynamic(() => import('./charts/SalesOverviewChart'), { ssr: false });

const SalesOverviewCard = () => {
    return (
        <Card sx={{ flex: 1, height: "481px", }}>
            <CardHeader
                title={<Typography fontSize={16} fontWeight={600}>Sales Overview</Typography>}
            />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
                <Box display={{ xs: "block", lg: "flex" }} alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" mb={{ xs: 2 }}>
                        <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
                            <Box sx={{
                                background: '#F26522 !important',
                                width: '10px',
                                height: '10px',
                                borderRadius: '2px',
                                display: 'inline-flex',
                                marginRight: 1
                            }} />  Income
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            <Box sx={{
                                background: '#E5E7EB !important',
                                width: '10px',
                                height: '10px',
                                borderRadius: '2px',
                                display: 'inline-flex',
                                marginRight: 1
                            }} />  Expenses
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        Last Updated at 11:30PM
                    </Typography>
                </Box>
                <SalesOverviewChart />
            </CardContent>
        </Card >
    );
};

export default SalesOverviewCard;
