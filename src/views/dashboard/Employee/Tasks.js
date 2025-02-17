import React, { useState } from 'react'
import { Avatar, Badge, Box, Button, Card, Checkbox, Divider, List, ListItem, ListItemAvatar, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { DotsGrid } from 'mdi-material-ui';

const Tasks = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const tasks = [
        {
            title: "Patient appointment booking",
            status: "Onhold",
            statusColor: "pink",
            priority: true,
            avatars: ["avatar-13.jpg", "avatar-14.jpg", "avatar-15.jpg"],
        },
        {
            title: "Appointment booking with payment",
            status: "Inprogress",
            statusColor: "purple",
            priority: false,
            avatars: ["avatar-20.jpg", "avatar-21.jpg"],
        },
        {
            title: "Patient and Doctor video conferencing",
            status: "Completed",
            statusColor: "green",
            priority: false,
            avatars: ["avatar-28.jpg", "avatar-29.jpg", "avatar-24.jpg"],
        },
        {
            title: "Private chat module",
            status: "Pending",
            statusColor: "gray",
            priority: false,
            avatars: ["avatar-23.jpg", "avatar-24.jpg", "avatar-25.jpg"],
            checked: true,
        }
    ];

    return (
        <Card>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
            }}>
                <Typography fontSize={16} fontWeight={600}>Tasks</Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleMenuClick}
                    sx={{ textTransform: "none" }}
                >
                    All Projects
                </Button>
                <Menu
                    id="year-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    MenuListProps={{ 'aria-labelledby': 'year-button' }}
                    PaperProps={{
                        style: {
                            minWidth: '10rem',
                        },
                    }}
                >
                    <MenuItem onClick={handleMenuClose}>All Projects</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Ongoing Projects</MenuItem>
                </Menu>
            </Box>
            <Divider sx={{ m: 0 }} />
            <Box padding={'15px'}>
                <List>
                    {tasks.map((task, index) => (
                        <ListItem
                            key={index}
                            divider
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                                rowGap: 2,
                                py: 2,
                            }}
                        >
                            <ListItemAvatar>
                                <Checkbox
                                    defaultChecked={task.checked || false}
                                    edge="start"
                                    disableRipple
                                />
                            </ListItemAvatar>
                            <div style={{ flex: 1 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ textDecoration: task.checked ? "line-through" : "none" }}
                                >
                                    {task.title}
                                </Typography>
                            </div>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                                flexWrap="wrap"
                                rowGap={1}
                            >
                                <Badge
                                    sx={{
                                        backgroundColor: task.statusColor,
                                        borderRadius: "12px",
                                        px: 1.5,
                                    }}
                                    color="primary"
                                    badgeContent={task.status}
                                    icon={<DotsGrid fontSize="small" />}
                                />
                                <Stack direction="row" spacing={-0.5}>
                                    {task.avatars.map((avatar, idx) => (
                                        <Avatar
                                            key={idx}
                                            src={`assets/img/profiles/${avatar}`}
                                            alt={`Avatar ${idx}`}
                                            sx={{ width: 30, height: 30, border: "2px solid white" }}
                                        />
                                    ))}
                                </Stack>
                            </Stack>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Card>
    )
}

export default Tasks
