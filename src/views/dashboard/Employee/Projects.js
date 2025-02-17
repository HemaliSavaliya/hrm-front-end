import { Avatar, Box, Button, Card, Divider, Grid, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { CalendarAdd01Icon, MoreVerticalSquare01Icon } from 'hugeicons-react';
import React, { useState } from 'react'

const Projects = () => {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElPro, setAnchorElPro] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuClickPro = (event) => {
        setAnchorElPro(event.currentTarget);
    };

    const handleMenuClosePro = () => {
        setAnchorElPro(null);
    };

    return (
        <Card>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
            }}>
                <Typography fontSize={16} fontWeight={600}>Projects</Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleMenuClick}
                    sx={{ textTransform: "none" }}
                >
                    Ongoing Projects
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
                <Grid container spacing={2}>
                    {/* Project Card 1 */}
                    <Grid item xs={12} md={3}>
                        <Card variant="outlined" sx={{ boxShadow: "none" }}>
                            <Box padding={3}>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    marginBottom={3}
                                >
                                    <Typography fontSize={14} fontWeight={600}>Office Management</Typography>
                                    <IconButton onClick={handleMenuClickPro} sx={{ padding: '0px !important' }}>
                                        <MoreVerticalSquare01Icon size={15} />
                                    </IconButton>
                                </Box>
                                <Menu
                                    anchorEl={anchorElPro}
                                    open={Boolean(anchorElPro)}
                                    onClose={handleMenuClosePro}
                                >
                                    <MenuItem onClick={handleMenuClosePro}>
                                        Edit
                                    </MenuItem>
                                    <MenuItem onClick={handleMenuClosePro}>
                                        Delete
                                    </MenuItem>
                                </Menu>

                                {/* Project Leader */}
                                <Box display="flex" alignItems="center" marginBottom={4}>
                                    <Avatar
                                        src="/images/avatars/avatar-7.png"
                                        alt="Anthony Lewis"
                                        sx={{ width: 40, height: 40 }}
                                    />
                                    <Box marginLeft={2}>
                                        <Typography fontSize={14} fontWeight={600}>Anthony Lewis</Typography>
                                        <Typography fontSize={12}>Project Leader</Typography>
                                    </Box>
                                </Box>

                                {/* Deadline */}
                                <Box display="flex" alignItems="center" marginBottom={4}>
                                    <Avatar sx={{ backgroundColor: "primary.main" }}>
                                        <CalendarAdd01Icon color='#fff' size={20} />
                                    </Avatar>
                                    <Box marginLeft={2}>
                                        <Typography fontSize={14} fontWeight={600}>14 Jan 2024</Typography>
                                        <Typography fontSize={12}>Deadline</Typography>
                                    </Box>
                                </Box>

                                {/* Tasks */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    padding={1}
                                    border="1px dashed #E5E7EB"
                                    borderRadius={1}
                                    marginBottom={4}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body2">
                                            Tasks:
                                            <br />
                                            <span>6 / 10</span>
                                        </Typography>
                                    </Box>
                                    <Box display="flex">
                                        <Avatar
                                            src="/images/avatars/5.png"
                                            sx={{
                                                border: "2px solid white", width: 30, height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        />
                                        <Avatar
                                            src="/images/avatars/6.png"
                                            sx={{
                                                border: "2px solid white", marginLeft: "-10px", width: 30, height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        />
                                        <Avatar
                                            src="/images/avatars/8.png"
                                            sx={{
                                                border: "2px solid white", marginLeft: "-10px", width: 30, height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        />
                                        <Avatar
                                            sx={{
                                                backgroundColor: "primary.main",
                                                color: "white",
                                                fontSize: "0.875rem",
                                                marginLeft: "-10px",
                                                width: 30,
                                                height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        >
                                            +2
                                        </Avatar>
                                    </Box>
                                </Box>

                                {/* Time Spent */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    padding={2}
                                    borderRadius={1}
                                    sx={{ backgroundColor: theme.palette.mode === "light" ? "grey.200" : "#9c9c9c12" }}
                                >
                                    <Typography variant="body2"
                                        sx={{
                                            whiteSpace: 'normal',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        Time Spent
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            whiteSpace: 'normal',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        65 / 120 <span style={{ fontWeight: "normal" }}>Hrs</span>
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Card variant="outlined" sx={{ boxShadow: "none" }}>
                            <Box padding={3}>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    marginBottom={3}
                                >
                                    <Typography fontSize={14} fontWeight={600}>Office Management</Typography>
                                    <IconButton onClick={handleMenuClickPro} sx={{ padding: '0px !important' }}>
                                        <MoreVerticalSquare01Icon size={15} />
                                    </IconButton>
                                </Box>
                                <Menu
                                    anchorEl={anchorElPro}
                                    open={Boolean(anchorElPro)}
                                    onClose={handleMenuClosePro}
                                >
                                    <MenuItem onClick={handleMenuClosePro}>
                                        Edit
                                    </MenuItem>
                                    <MenuItem onClick={handleMenuClosePro}>
                                        Delete
                                    </MenuItem>
                                </Menu>

                                {/* Project Leader */}
                                <Box display="flex" alignItems="center" marginBottom={4}>
                                    <Avatar
                                        src="/images/avatars/avatar-2.png"
                                        alt="Anthony Lewis"
                                        sx={{ width: 40, height: 40 }}
                                    />
                                    <Box marginLeft={2}>
                                        <Typography fontSize={14} fontWeight={600}>Anthony Lewis</Typography>
                                        <Typography fontSize={12}>Project Leader</Typography>
                                    </Box>
                                </Box>

                                {/* Deadline */}
                                <Box display="flex" alignItems="center" marginBottom={4}>
                                    <Avatar sx={{ backgroundColor: "primary.main" }}>
                                        <CalendarAdd01Icon color='#fff' size={20} />
                                    </Avatar>
                                    <Box marginLeft={2}>
                                        <Typography fontSize={14} fontWeight={600}>14 Jan 2024</Typography>
                                        <Typography fontSize={12}>Deadline</Typography>
                                    </Box>
                                </Box>

                                {/* Tasks */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    padding={1}
                                    border="1px dashed #E5E7EB"
                                    borderRadius={1}
                                    marginBottom={4}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body2">
                                            Tasks:
                                            <br />
                                            <span>6 / 10</span>
                                        </Typography>
                                    </Box>
                                    <Box display="flex">
                                        <Avatar
                                            src="/images/avatars/5.png"
                                            sx={{
                                                border: "2px solid white", width: 30, height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        />
                                        <Avatar
                                            src="/images/avatars/6.png"
                                            sx={{
                                                border: "2px solid white", marginLeft: "-10px", width: 30, height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        />
                                        <Avatar
                                            src="/images/avatars/8.png"
                                            sx={{
                                                border: "2px solid white", marginLeft: "-10px", width: 30, height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        />
                                        <Avatar
                                            sx={{
                                                backgroundColor: "primary.main",
                                                color: "white",
                                                fontSize: "0.875rem",
                                                marginLeft: "-10px",
                                                width: 30,
                                                height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        >
                                            +2
                                        </Avatar>
                                    </Box>
                                </Box>

                                {/* Time Spent */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    padding={2}
                                    borderRadius={1}
                                    sx={{ backgroundColor: theme.palette.mode === "light" ? "grey.200" : "#9c9c9c12" }}
                                >
                                    <Typography variant="body2"
                                        sx={{
                                            whiteSpace: 'normal',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        Time Spent
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            whiteSpace: 'normal',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        65 / 120 <span style={{ fontWeight: "normal" }}>Hrs</span>
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Card variant="outlined" sx={{ boxShadow: "none" }}>
                            <Box padding={3}>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    marginBottom={3}
                                >
                                    <Typography fontSize={14} fontWeight={600}>Office Management</Typography>
                                    <IconButton onClick={handleMenuClickPro} sx={{ padding: '0px !important' }}>
                                        <MoreVerticalSquare01Icon size={15} />
                                    </IconButton>
                                </Box>
                                <Menu
                                    anchorEl={anchorElPro}
                                    open={Boolean(anchorElPro)}
                                    onClose={handleMenuClosePro}
                                >
                                    <MenuItem onClick={handleMenuClosePro}>
                                        Edit
                                    </MenuItem>
                                    <MenuItem onClick={handleMenuClosePro}>
                                        Delete
                                    </MenuItem>
                                </Menu>

                                {/* Project Leader */}
                                <Box display="flex" alignItems="center" marginBottom={4}>
                                    <Avatar
                                        src="/images/avatars/avatar-2.png"
                                        alt="Anthony Lewis"
                                        sx={{ width: 40, height: 40 }}
                                    />
                                    <Box marginLeft={2}>
                                        <Typography fontSize={14} fontWeight={600}>Anthony Lewis</Typography>
                                        <Typography fontSize={12}>Project Leader</Typography>
                                    </Box>
                                </Box>

                                {/* Deadline */}
                                <Box display="flex" alignItems="center" marginBottom={4}>
                                    <Avatar sx={{ backgroundColor: "primary.main" }}>
                                        <CalendarAdd01Icon color='#fff' size={20} />
                                    </Avatar>
                                    <Box marginLeft={2}>
                                        <Typography fontSize={14} fontWeight={600}>14 Jan 2024</Typography>
                                        <Typography fontSize={12}>Deadline</Typography>
                                    </Box>
                                </Box>

                                {/* Tasks */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    padding={1}
                                    border="1px dashed #E5E7EB"
                                    borderRadius={1}
                                    marginBottom={4}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body2">
                                            Tasks:
                                            <br />
                                            <span>6 / 10</span>
                                        </Typography>
                                    </Box>
                                    <Box display="flex">
                                        <Avatar
                                            src="/images/avatars/5.png"
                                            sx={{
                                                border: "2px solid white", width: 30, height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        />
                                        <Avatar
                                            src="/images/avatars/6.png"
                                            sx={{
                                                border: "2px solid white", marginLeft: "-10px", width: 30, height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        />
                                        <Avatar
                                            src="/images/avatars/8.png"
                                            sx={{
                                                border: "2px solid white", marginLeft: "-10px", width: 30, height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        />
                                        <Avatar
                                            sx={{
                                                backgroundColor: "primary.main",
                                                color: "white",
                                                fontSize: "0.875rem",
                                                marginLeft: "-10px",
                                                width: 30,
                                                height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        >
                                            +2
                                        </Avatar>
                                    </Box>
                                </Box>

                                {/* Time Spent */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    padding={2}
                                    borderRadius={1}
                                    sx={{ backgroundColor: theme.palette.mode === "light" ? "grey.200" : "#9c9c9c12" }}
                                >
                                    <Typography variant="body2"
                                        sx={{
                                            whiteSpace: 'normal',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        Time Spent
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            whiteSpace: 'normal',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        65 / 120 <span style={{ fontWeight: "normal" }}>Hrs</span>
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Card variant="outlined" sx={{ boxShadow: "none" }}>
                            <Box padding={3}>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    marginBottom={3}
                                >
                                    <Typography fontSize={14} fontWeight={600}>Office Management</Typography>
                                    <IconButton onClick={handleMenuClickPro} sx={{ padding: '0px !important' }}>
                                        <MoreVerticalSquare01Icon size={15} />
                                    </IconButton>
                                </Box>
                                <Menu
                                    anchorEl={anchorElPro}
                                    open={Boolean(anchorElPro)}
                                    onClose={handleMenuClosePro}
                                >
                                    <MenuItem onClick={handleMenuClosePro}>
                                        Edit
                                    </MenuItem>
                                    <MenuItem onClick={handleMenuClosePro}>
                                        Delete
                                    </MenuItem>
                                </Menu>

                                {/* Project Leader */}
                                <Box display="flex" alignItems="center" marginBottom={4}>
                                    <Avatar
                                        src="/images/avatars/avatar-2.png"
                                        alt="Anthony Lewis"
                                        sx={{ width: 40, height: 40 }}
                                    />
                                    <Box marginLeft={2}>
                                        <Typography fontSize={14} fontWeight={600}>Anthony Lewis</Typography>
                                        <Typography fontSize={12}>Project Leader</Typography>
                                    </Box>
                                </Box>

                                {/* Deadline */}
                                <Box display="flex" alignItems="center" marginBottom={4}>
                                    <Avatar sx={{ backgroundColor: "primary.main" }}>
                                        <CalendarAdd01Icon color='#fff' size={20} />
                                    </Avatar>
                                    <Box marginLeft={2}>
                                        <Typography fontSize={14} fontWeight={600}>14 Jan 2024</Typography>
                                        <Typography fontSize={12}>Deadline</Typography>
                                    </Box>
                                </Box>

                                {/* Tasks */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    padding={1}
                                    border="1px dashed #E5E7EB"
                                    borderRadius={1}
                                    marginBottom={4}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body2">
                                            Tasks:
                                            <br />
                                            <span>6 / 10</span>
                                        </Typography>
                                    </Box>
                                    <Box display="flex">
                                        <Avatar
                                            src="/images/avatars/5.png"
                                            sx={{
                                                border: "2px solid white", width: 30, height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        />
                                        <Avatar
                                            src="/images/avatars/6.png"
                                            sx={{
                                                border: "2px solid white", marginLeft: "-10px", width: 30, height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        />
                                        <Avatar
                                            src="/images/avatars/8.png"
                                            sx={{
                                                border: "2px solid white", marginLeft: "-10px", width: 30, height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        />
                                        <Avatar
                                            sx={{
                                                backgroundColor: "primary.main",
                                                color: "white",
                                                fontSize: "0.875rem",
                                                marginLeft: "-10px",
                                                width: 30,
                                                height: 30,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    zIndex: 1,
                                                    transform: 'translateY(-0.188rem)'
                                                }
                                            }}
                                        >
                                            +2
                                        </Avatar>
                                    </Box>
                                </Box>

                                {/* Time Spent */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    padding={2}
                                    borderRadius={1}
                                    sx={{ backgroundColor: theme.palette.mode === "light" ? "grey.200" : "#9c9c9c12" }}
                                >
                                    <Typography variant="body2"
                                        sx={{
                                            whiteSpace: 'normal',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        Time Spent
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            whiteSpace: 'normal',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        65 / 120 <span style={{ fontWeight: "normal" }}>Hrs</span>
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    )
}

export default Projects
