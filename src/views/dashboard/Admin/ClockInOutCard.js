import React, { useState } from "react";
import { Card, CardHeader, CardContent, Typography, Avatar, Menu, MenuItem, Button, IconButton, Divider, useTheme, Box } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { AlarmClockIcon, Calendar04Icon } from "hugeicons-react";

const employees = [
  { name: "Daniel Esbella", role: "UI/UX Designer", avatar: "images/avatars/avatar-2.png", time: "09:15" },
  { name: "Doglas Martini", role: "Project Manager", avatar: "images/avatars/avatar-3.png", time: "09:36" },
  { name: "Brian Villalobos", role: "PHP Developer", avatar: "images/avatars/avatar-7.png", time: "09:15", clockIn: "10:30 AM", clockOut: "09:45 AM", production: "09:21 Hrs" }
];

const lateEmployees = [
  { name: "Anthony Lewis", role: "Marketing Head", avatar: "images/avatars/avatar-10.png", time: "08:35", lateBy: "30 Min" },
  { name: "Daniel Esbella", role: "UI/UX Designer", avatar: "images/avatars/avatar-2.png", time: "08:35", lateBy: "10 Min" }
];

const ClockInOutCard = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Today");

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (filter) => {
    if (filter) setSelectedFilter(filter);
    setAnchorEl(null);
  };

  return (
    <Card sx={{ height: { xs: "481px", xl: '511px' }, display: "flex", flexDirection: "column" }}>
      {/* Header (Fixed, Not Scrolling) */}
      <CardHeader
        title={<Typography fontSize={16} fontWeight={600}>Clock-In/Out</Typography>}
        action={
          <>
            <IconButton
              onClick={handleClick}
              sx={{
                border: theme.palette.mode === "light" ? '1px solid #E5E7EB !important' : "1px solid #5d5971 !important",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <Calendar04Icon size={18} />
              {selectedFilter}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleClose()}
            >
              {["This Month", "This Week", "Today"].map((period) => (
                <MenuItem
                  key={period}
                  onClick={() => handleClose(period)}
                  sx={{ borderRadius: "4px" }}
                >
                  {period}
                </MenuItem>
              ))}
            </Menu>
          </>
        }
      />
      <Divider sx={{ margin: 0 }} />

      {/* Scrollable Content */}
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <PerfectScrollbar style={{ maxHeight: "100%" }}>
          <CardContent sx={{ paddingTop: 6 }}>
            {employees.map((employee, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", border: `1px dashed ${theme.palette.mode === "light" ? "#ddd" : "#5a576e"}`, mb: 2, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={employee.avatar} />
                  <Box sx={{ marginLeft: "10px" }}>
                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {employee.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" fontSize={13}>{employee.role}</Typography>
                  </Box>
                </Box>
                <Box sx={{ background: '#03C95A', color: '#fff', padding: '0.25rem 0.45rem', fontWeight: 600, borderRadius: '4px', fontSize: '10px', display: "flex", alignItems: "center", gap: 1, width: 75 }}>
                  <AlarmClockIcon size={15} />
                  <Typography variant="body2" color="#fff">{employee.time}</Typography>
                </Box>
              </Box>
            ))}
            <Typography fontSize={14} fontWeight={600} mb={1}>Late</Typography>
            {lateEmployees.map((employee, index) => (
              <Box key={index} sx={{ display: { xs: "block", lg: "flex" }, alignItems: "center", justifyContent: "space-between", padding: "10px", border: `1px dashed ${theme.palette.mode === "light" ? "#ddd" : "#5a576e"}`, mb: 2, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2 } }}>
                  <Avatar src={employee.avatar} />
                  <Box sx={{ marginLeft: "10px" }}>
                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {employee.name}
                      <span style={{ marginLeft: "10px", background: '#E70D0D', color: '#fff', padding: '0.25rem 0.45rem', fontWeight: 600, borderRadius: '4px', fontSize: '10px', display: "inline-flex" }}>
                        {employee.lateBy}
                      </span>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" fontSize={13}>{employee.role}</Typography>
                  </Box>
                </Box>
                <Box sx={{ background: '#E70D0D', color: '#fff', padding: '0.25rem 0.45rem', fontWeight: 600, borderRadius: '4px', fontSize: '10px', display: "flex", alignItems: "center", gap: 1, width: 75 }}>
                  <AlarmClockIcon size={15} />
                  <Typography variant="body2" color="#fff">{employee.time}</Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </PerfectScrollbar>
      </Box>

      {/* Fixed Button (Not Scrolling) */}
      <Divider sx={{ margin: 0 }} />
      <Box sx={{ padding: 2 }}>
        <Button variant="outlined" fullWidth
          sx={{
            backgroundColor: theme.palette.mode === "light" ? '#F8F9FA' : "#403d59",
            border: theme.palette.mode === "light" ? '1px solid #cbcbcb' : "1px solid #524f68",
            color: theme.palette.mode === "light" ? '#111827' : "#e1e3e7",
            textTransform: 'capitalize',
            "&:hover": {
              backgroundColor: 'rgba(115, 102, 255, 0%)',
              border: '1px solid #7366ff',
              color: "primary.main"
            }
          }}
        >
          View All Attendance
        </Button>
      </Box>
    </Card>
  );
};

export default ClockInOutCard;
