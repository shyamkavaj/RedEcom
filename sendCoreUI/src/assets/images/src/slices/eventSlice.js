import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import EventService from 'src/services/EventService'

export const getAllEvent = createAsyncThunk('event/getAllEvent', async () => {
  try {
    const res = await EventService.getAllEvent()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const getEventById = createAsyncThunk('event/getEventById', async (id) => {
  try {
    const res = await EventService.getEventById(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const createEvent = createAsyncThunk('event/createEvent', async (data) => {
  try {
    const res = await EventService.createEvent(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const updateEvent = createAsyncThunk('event/updateEvent', async (data) => {
  try {
    const res = await EventService.updateEvent(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const deleteEvent = createAsyncThunk('event/deleteEvent', async (id) => {
  try {
    const res = await EventService.deleteEvent(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
const initialState = {
  events: [],
  loading: false,
  error: '',
  event: {},
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  extraReducers(builder) {
    ///GET ALL EVENT
    builder
      .addCase(getAllEvent.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllEvent.fulfilled, (state, { payload }) => {
        state.loading = false
        state.events = payload
      })
      .addCase(getAllEvent.rejected, (state) => {
        state.loading = false
      })

    ///GET EVENT BY ID

    builder
      .addCase(getEventById.pending, (state) => {
        state.loading = true
      })
      .addCase(getEventById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.event = payload
      })
      .addCase(getEventById.rejected, (state) => {
        state.loading = false
      })

    // CREATE EVENT
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true
      })
      .addCase(createEvent.fulfilled, (state, { payload }) => {
        state.loading = false
        state.events = [...state.events, payload]
      })
      .addCase(createEvent.rejected, (state) => {
        state.loading = false
      })

    // UPDATE EVENT
    builder
      .addCase(updateEvent.pending, (state) => {
        state.loading = true
      })
      .addCase(updateEvent.fulfilled, (state, { payload }) => {
        state.loading = false
        state.event = { ...state.event, payload }
      })
      .addCase(updateEvent.rejected, (state) => {
        state.loading = false
      })

    // DELETE EVENT
    builder
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteEvent.fulfilled, (state, { payload }) => {
        const deleteEvent = [...state.events].filter((event) => event.id !== payload)
        return {
          ...state,
          loading: false,
          events: deleteEvent,
        }

      })
      .addCase(deleteEvent.rejected, (state, payload) => {
        state.loading = false
        state.error = payload
      })
  },
})
export default eventSlice.reducer
