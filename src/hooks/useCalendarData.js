/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

const initialEventFormState = {
    description: "",
    todoId: undefined
};

const initialDatePickerEventFormData = {
    description: "",
    todoId: undefined,
    allDay: false,
    start: undefined,
    end: undefined,
};

const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString();

const useCalendarData = () => {
    const [openSlot, setOpenSlot] = useState(false);
    const [openDatepickerModal, setOpenDatepickerModal] = useState(false);
    const [openTodoModal, setOpenTodoModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [eventInfoModal, setEventInfoModal] = useState(false);
    const [events, setEvents] = useState([]);
    const [editedEventData, setEditedEventData] = useState(null);
    const [todos, setTodos] = useState([]);
    const [eventFormData, setEventFormData] = useState(initialEventFormState);
    const [datePickerEventFormData, setDatePickerEventFormData] = useState(initialDatePickerEventFormData);
    const [scroll, setScroll] = useState('body');
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const currentDate = new Date();
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

    // ** Hooks
    const theme = useTheme();

    // Fetch events from the backend when the component is mounted
    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/calendar-event-list`, {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`,
                },
            });

            // Filter out deleted calendar event before setting the state
            const activeCalendarEvent = response.data.filter(event => !event.deleted);

            setEvents(activeCalendarEvent, response.data);
        } catch (error) {
            console.error("Error fetching calendar event", error);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSelectSlot = (event, scrollType) => {
        setOpenSlot(true);
        setScroll(scrollType);
        setCurrentEvent(event);
    };

    const handleSelectEvent = (event) => {
        setCurrentEvent(event);
        setEventInfoModal(true);
    };

    const handleClose = () => {
        setEventFormData(initialEventFormState);
        setOpenSlot(false);
        setEditedEventData(null);
    };

    const handleDatePickerClose = () => {
        setDatePickerEventFormData(initialDatePickerEventFormData);
        setOpenDatepickerModal(false);
    };

    const onAddEvent = async (e) => {
        e.preventDefault();

        if (editedEventData) {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/update-calendar-event/${currentEvent.id}`, { ...eventFormData }, {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`,
                },
            });

            toast.success('Calendar Event Updated Successful!', {
                duration: 2000,
                position: 'top-center',

                // Styling
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: "15px",
                },
            });

            setTimeout(() => {
                // Handle the updated todos in your state or UI
                const updatedEvent = response.data;

                setEvents((prevEvent) => {
                    return prevEvent.map((event) => event.id === updatedEvent.id ? updatedEvent : event);
                });
                setEditedEventData(null);
                setEventFormData(initialEventFormState);
                setEventInfoModal(false);

                fetchEvents();
            }, 1000); // 1000 milliseconds = 1 seconds

        } else {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/add-calendar-event`, {
                ...eventFormData,
                companyId: authToken.companyId,
                start: currentEvent?.start,
                end: currentEvent?.end
            }, {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`,
                }
            });

            // Check the success status from the API response
            if (response.data) {
                toast.success('Calendar Event Added Successful!', {
                    duration: 2000,
                    position: 'top-center',

                    // Styling
                    style: {
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        fontSize: "15px",
                    },
                });

                setTimeout(async () => {
                    setEvents([...events, response.data]);
                    setEventFormData(initialEventFormState);

                    fetchEvents();
                }, 1000); // 1000 milliseconds = 1 seconds

            } else {
                console.error("Error Adding Event:");
                toast.error('Error Adding Event. Please try again.', {
                    duration: 2000,
                    position: 'top-center',

                    // Styling
                    style: {
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        fontSize: "15px",
                    },
                });
            }
        }

        handleClose();
    };

    const onAddEventFromDatePicker = async (e) => {
        e.preventDefault();

        const addHours = (date, hours) => {
            return date ? date.setHours(date.getHours() + hours) : undefined;
        };

        const setMinToZero = (date) => {
            date.setSeconds(0);

            return date;
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/add-calendar-event`, {
                ...datePickerEventFormData,
                companyId: authToken.companyId,
                start: setMinToZero(datePickerEventFormData.start),
                end: datePickerEventFormData.allDay
                    ? addHours(datePickerEventFormData.start, 12)
                    : setMinToZero(datePickerEventFormData.end),
            }, {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`,
                }
            });

            toast.success('Calendar Event Added Successful!', {
                duration: 2000,
                position: 'top-center',

                // Styling
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: "15px",
                },
            });

            setTimeout(async () => {
                const newEvents = [...events, response.data];
                setEvents(newEvents);

                setDatePickerEventFormData(initialDatePickerEventFormData);
                handleDatePickerClose();

                await fetchEvents();
            }, 1000); // 1000 milliseconds = 1 seconds

        } catch (error) {
            console.error("Error Adding Event", error);
            toast.error('Error Adding Event. Please try again.', {
                duration: 2000,
                position: 'top-center',

                // Styling
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: "15px",
                },
            });
        }
    };

    const onDeleteEvent = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-calendar-event/${currentEvent.id}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`,
                }
            });

            toast.success('Calendar Event Deleted Successful!', {
                duration: 2000,
                position: 'top-center',

                // Styling
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: "15px",
                },
            });

            setTimeout(async () => {
                setEvents((prevEvent) => prevEvent.filter(event => event.id !== currentDate.id));
                setEventInfoModal(false);
                await fetchEvents();
            }, 1000); // 1000 milliseconds = 1 seconds

        } catch (error) {
            console.error("Error deleting event: ", error);
            toast.error('Error Deleting Calendar Event.', {
                duration: 2000,
                position: 'top-center',

                // Styling
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: "15px",
                },
            });
        }
    };

    const onEditEvent = (_id) => {
        setOpenSlot(true);
        const eventToEdit = events.find((event) => event.id === _id);
        if (eventToEdit) {
            setEditedEventData(eventToEdit);
            setEventFormData({
                description: eventToEdit.description,
                todoId: eventToEdit.todoId,
                start: currentEvent?.start,
                end: currentEvent?.end
            });
        }
    };

    const dayPropGetter = (date) => {
        const isPrevMonth = date.getMonth() < currentMonth;
        const isNextMonth = date.getMonth() > currentMonth;
        const isCurrentDate = date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth();

        return {
            style: {
                backgroundColor: isPrevMonth || isNextMonth ? theme.palette.background.default : (isCurrentDate ? theme.palette.background.default : ""), // Set the desired background color
            },
        };
    };

    const handleNavigate = (date, view) => {
        // Update the currentMonth state when the user navigates to a different month
        setCurrentMonth(date.getMonth());
    };

    return {
        openSlot,
        openDatepickerModal,
        openTodoModal,
        setOpenTodoModal,
        eventInfoModal,
        todos,
        setTodos,
        scroll,
        handleSelectSlot,
        handleSelectEvent,
        onAddEvent,
        onAddEventFromDatePicker,
        onDeleteEvent,
        onEditEvent,
        dayPropGetter,
        handleNavigate,
        handleClose,
        eventFormData,
        setEventFormData,
        currentEvent,
        editedEventData,
        handleDatePickerClose,
        datePickerEventFormData,
        setDatePickerEventFormData,
        events,
        generateId,
        setOpenDatepickerModal,
        setEventInfoModal
    }
}

export default useCalendarData;