import React, { useState } from "react";
import { Card, CardHeader, CardContent, Typography, Menu, MenuItem, IconButton, Divider, useTheme, Box, Checkbox } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Calendar04Icon } from "hugeicons-react";

const initialTodos = [
  { id: 1, text: "Add Holidays", completed: false },
  { id: 2, text: "Add Meeting to Client", completed: false },
  { id: 3, text: "Chat with Adrian", completed: false },
  { id: 4, text: "Management Call", completed: false },
  { id: 5, text: "Add Payroll", completed: false },
  { id: 6, text: "Add Policy for Increment", completed: false }
];

const TodoList = () => {
  const theme = useTheme();
  const [todos, setTodos] = useState(initialTodos);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Today");

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (filter) => {
    if (filter) setSelectedFilter(filter);
    setAnchorEl(null);
  };

  const handleCheckboxChange = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <Card sx={{ height: "481px", display: "flex", flexDirection: "column" }}>
      {/* Header (Fixed, Not Scrolling) */}
      <CardHeader
        title={<Typography fontSize={16} fontWeight={600}>Todo</Typography>}
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
        <PerfectScrollbar style={{ maxHeight: "400px" }}>
          <CardContent sx={{ paddingTop: 6 }}>
            {todos.map((todo) => (
              <Box key={todo.id} display="flex" alignItems="center" p={1} border={1} borderRadius={1} mb={4} sx={{
                borderColor: "divider", backgroundColor: todo.completed
                  ? (theme.palette.mode === "light" ? "#f1ebfe" : "#3e386f")
                  : "none"
              }}>
                {/* <DragIndicatorIcon sx={{ mr: 1, cursor: "grab" }} /> */}
                <Checkbox checked={todo.completed} onChange={() => handleCheckboxChange(todo.id)} />
                <Typography
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    fontWeight: 500,
                    fontSize: 14
                  }}
                >
                  {todo.text}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </PerfectScrollbar>
      </Box>
    </Card>
  );
};

export default TodoList;
