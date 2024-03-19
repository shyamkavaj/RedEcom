import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import PlanService from 'src/services/PlanService'

export const getAllPlans = createAsyncThunk('plans/getAllPlans', async () => {
  try {
    const res = await PlanService.getAll()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const getPlanById = createAsyncThunk('plans/getPlanById', async (id) => {
  try {
    const res = await PlanService.getById(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const createPlan = createAsyncThunk('plans/createPlan', async (data) => {
  try {
    const res = await PlanService.create(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const updatePlan = createAsyncThunk('plans/updatePlan', async (data) => {
  try {
    const res = await PlanService.update(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const removePlan = createAsyncThunk("plans/removePlan", async (id) => {
  try {
    const res = await PlanService.remove(id)
    return id
  } catch (error) {
    console.log(error);
  }
});


const initialState = {
  plans: [],
  loading: false,
  error: '',
  plan: null,
}

const planSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {},
  extraReducers: {
    // GET ALL Plans
    [getAllPlans.pending]: (state) => {
      state.loading = true
    },
    [getAllPlans.fulfilled]: (state, action) => {
      state.loading = false
      state.plans = action.payload
    },
    [getAllPlans.rejected]: (state, action) => {
      state.loading = false
      state.plans = []
      state.error = action.payload
    },

    //GET BY ID Plan

    [getPlanById.pending]: (state) => {
      state.loading = true
    },
    [getPlanById.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.plan = payload
    },
    [getPlanById.rejected]: (state, { payload }) => {
      state.loading = false
      state.plan = {}
      state.error = payload
    },

    // ADD PLAN

    //
    [createPlan.pending]: (state) => {
      state.loading = true
    },
    [createPlan.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.plans = [...state.plans, payload]
    },
    [createPlan.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    // UPDATE PLAN

    [updatePlan.pending]: (state) => {
      state.loading = true
    },
    [updatePlan.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.plan = { ...state.plan, ...payload }
    },
    [updatePlan.rejected]: (state) => {
      state.loading = false
    },

    //DELETE achivement


    [removePlan.pending]: (state) => {
      state.loading = true
    },
    [removePlan.fulfilled]: (state, { payload }) => {
      const removePlan = [...state.plans].filter(
        (plan) => plan.id !== payload,
      )
      return {
        ...state,
        loading: false,
        plans: removePlan,
      }
    },
    [removePlan.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export default planSlice.reducer
