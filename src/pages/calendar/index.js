import { Box, Button, Card, CardContent, Container, Divider, useTheme } from '@mui/material'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import AddEventModal from 'src/components/CalendarModal/AddEventModal'
import AddTodoModal from 'src/components/CalendarModal/AddTodoModal'
import EventInfo from 'src/components/CalendarModal/EventInfo'
import EventInfoModal from 'src/components/CalendarModal/EventInfoModal'
import enIN from 'date-fns/locale/en-IN'
import AddDatePickerEventModal from 'src/components/CalendarModal/AddDatePickerEventModal'
import CustomToolbar from 'src/components/CalendarModal/CustomToolbar'
import useCalendarData from 'src/hooks/useCalendarData'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { saveButton } from 'src/Styles'
import { PlusSignIcon } from 'hugeicons-react'

const locales = {
  'en-IN': enIN
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const EventCalendar = () => {
  const [loading, setLoading] = useState(true)
  const theme = useTheme()

  const {
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
  } = useCalendarData()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      >
        <img src='/images/loader.svg' alt='loader' />
      </div>
    )
  }

  return (
    <Box component='main' sx={{ flexGrow: 1 }}>
      <Toaster />
      <Container maxWidth={false} sx={{ pl: 0, pr: 0 }}>
        <Card sx={{ pt: 0 }}>
          <CardContent>
            <Box sx={{ display: 'flex' }}>
              <Button
                sx={{
                  ...saveButton,
                  gap: 1,
                  '&.MuiButton-root:hover': {
                    backgroundColor: theme.palette.primary.hover
                  }
                }}
                variant='contained'
                onClick={() => setOpenDatepickerModal(true)}
              >
                Add Event <PlusSignIcon size={15} />
              </Button>
              <Button
                variant='contained'
                onClick={() => setOpenTodoModal(true)}
                sx={{
                  ...saveButton,
                  gap: 1,
                  '&.MuiButton-root:hover': {
                    backgroundColor: theme.palette.primary.hover
                  }
                }}
              >
                Create todo <PlusSignIcon size={15} />
              </Button>
            </Box>
            <Divider style={{ margin: 10 }} />
            <AddEventModal
              open={openSlot}
              handleClose={handleClose}
              eventFormData={eventFormData}
              setEventFormData={setEventFormData}
              onAddEvent={onAddEvent}
              editedEvent={currentEvent}
              todos={todos}
              scroll={scroll}
              editedEventData={editedEventData}
            />
            <AddDatePickerEventModal
              open={openDatepickerModal}
              handleClose={handleDatePickerClose}
              datePickerEventFormData={datePickerEventFormData}
              setDatePickerEventFormData={setDatePickerEventFormData}
              onAddEvent={onAddEventFromDatePicker}
              todos={todos}
            />
            <AddTodoModal
              open={openTodoModal}
              handleClose={() => setOpenTodoModal(false)}
              todos={todos}
              setTodos={setTodos}
              generateId={generateId}
            />
            <EventInfoModal
              open={eventInfoModal}
              handleClose={() => setEventInfoModal(false)}
              onDeleteEvent={onDeleteEvent}
              currentEvent={currentEvent}
              onEditEvent={onEditEvent}
            />
            <Calendar
              localizer={localizer}
              events={events}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              startAccessor='start'
              endAccessor='end'
              defaultView='month'
              components={{ event: EventInfo, toolbar: CustomToolbar }}
              dayPropGetter={dayPropGetter}
              onNavigate={handleNavigate}
              eventPropGetter={event => {
                const hasTodo = todos.find(todo => todo.id === event.todoId)

                return {
                  style: {
                    backgroundColor: hasTodo ? hasTodo.color : '#b64fc8',
                    borderColor: hasTodo ? hasTodo.color : '#b64fc8'
                  }
                }
              }}
              style={{ height: 600, width: '100%' }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default EventCalendar
