/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import { HexColorPicker } from 'react-colorful'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import { cancelButton, formStyles, saveButton } from 'src/Styles'

const AddTodoModal = ({ open, handleClose, todos, setTodos }) => {
  const [color, setColor] = useState('#b32aa9')
  const [name, setName] = useState('')
  const [editingTodo, setEditingTodo] = useState(null)
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()
  const styles = formStyles(theme);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/todosList`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // Filter out deleted todo before setting the state
      const activeCalendarTodo = response.data.filter(todo => !todo.deleted)

      setTodos(activeCalendarTodo, response.data)
    } catch (error) {
      console.error('Error fetching Todo List:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [authToken?.token])

  const onAddTodo = async () => {
    try {
      // If editingTodo is set, update the existing todo
      if (editingTodo) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_URL}/update-todos/${editingTodo.id}`,
          { name, color },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken?.token}`
            }
          }
        )

        toast.success('Todo Updated Successful!', {
          duration: 2000,
          position: 'top-center',

          // Styling
          style: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontSize: '15px'
          }
        })

        setTimeout(async () => {
          // Handle the updated todos in your state or UI
          const updatedTodos = response.data

          setTodos(prevTodo => {
            return prevTodo.map(todo => (todo.id === updatedTodos.id ? updatedTodos : todo))
          })
          setEditingTodo(null)
          setName('')
          await fetchTodos()
        }, 1000) // 1000 milliseconds = 1 seconds
      } else {
        // If not editing, add a new todos
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/todos`,
          { companyId: authToken.companyId, name, color },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken?.token}`
            }
          }
        )

        // Check the success status from the API response
        if (response.data) {
          toast.success('Todo Added Successful!', {
            duration: 2000,
            position: 'top-center',

            // Styling
            style: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontSize: '15px'
            }
          })

          setTimeout(async () => {
            // Instead of relying on the previous state, you can use the response data directly
            setTodos(prevData => [...prevData, response.data])
            setName('')
            await fetchTodos()
          }, 1000) // 1000 milliseconds = 1 seconds
        }
      }
    } catch (error) {
      console.error('Error adding/updating todos: ' + error)
      toast.error('Error Adding/Updating Todo. Please try again.', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    }
  }

  const onEditTodo = _id => {
    const todoToEdit = todos.find(todo => todo.id === _id)
    if (todoToEdit) {
      setEditingTodo(todoToEdit)
      setName(todoToEdit.name)
      setColor(todoToEdit.color)
    }
  }

  const onDeleteTodo = async _id => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-todos/${_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      toast.success('Todo Deleted Successful!', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })

      setTimeout(() => {
        setTodos(todos.filter(todo => todo.id !== _id))
      }, 1000) // 1000 milliseconds = 1 seconds
    } catch (error) {
      console.error('Error deleting todo:', error)
      toast.error('Error Deleting Todo. Please try again.', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    }
  }

  const onClose = () => {
    setEditingTodo('')
    setName('')
    setColor('')
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogTitle id='scroll-dialog-title'>
        <Typography variant='h6' fontWeight={600}>
          Add Todos
        </Typography>
        <Typography variant='caption' fontWeight={600}>
          Create todos to add to your Calendar.
        </Typography>
      </DialogTitle>
      <Divider sx={{ margin: 0 }} />
      <DialogContent>
        <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
          <TextField
            autoComplete='off'
            name='name'
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            type='text'
            fullWidth
            variant='filled'
            size="small"
            onChange={e => {
              setName(e.target.value)
            }}
            value={name}
            sx={{ ...styles.inputLabel, ...styles.inputField, mb: 6 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <HexColorPicker color={color} onChange={setColor} style={{ width: 270, height: 200 }} />
            <Box
              sx={{ height: 50, width: 50, borderRadius: 0.9, ml: 3, backgroundColor: color }}
              className='value'
            ></Box>
          </Box>
          <Box>
            <List sx={{ marginTop: 3 }}>
              {todos.map(todo => (
                <ListItem
                  key={todo.id}
                  secondaryAction={
                    <>
                      <IconButton onClick={() => onEditTodo(todo.id)} edge='end' color='default'>
                        <PencilOutline />
                      </IconButton>
                      <IconButton onClick={() => onDeleteTodo(todo.id)} color='error' edge='end'>
                        <DeleteOutline />
                      </IconButton>
                    </>
                  }
                >
                  <Box
                    sx={{ height: 20, width: 20, borderRadius: 0.4, marginRight: 2 }}
                    className='value'
                    style={{ backgroundColor: todo.color }}
                  ></Box>
                  <ListItemText primary={todo.name} sx={{ textTransform: 'capitalize' }} />
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContentText>
      </DialogContent>
      <Divider sx={{ margin: 0 }} />
      <DialogActions>
        <Button color='secondary' variant='outlined' onClick={onClose} sx={cancelButton}>
          Cancel
        </Button>
        <Button
          type='submit'
          sx={{
            ...saveButton,
            '&.MuiButton-root:hover': {
              backgroundColor: theme.palette.primary.hover
            }
          }}
          variant='contained'
          disabled={name === '' || color === ''}
          onClick={() => onAddTodo()}
        >
          {editingTodo ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddTodoModal
