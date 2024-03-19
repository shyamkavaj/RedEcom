import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AchivementService from 'src/services/AchivementService'

export const getAll = createAsyncThunk('achivements/getAll', async () => {
    try {
        const res = await AchivementService.getAll()
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const getAchivementById = createAsyncThunk('achivements/getAchivementById', async (id) => {
    try {
        const res = await AchivementService.getById(id)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})
export const addAchivement = createAsyncThunk('achivements/addAchivement', async (data) => {
    try {
        const res = await AchivementService.create(data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const updateAchivement = createAsyncThunk('achivements/updateAchivement', async (data) => {
    try {
        // const id = data.id
        const res = await AchivementService.update(data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

// export const deleteAchivement = createAsyncThunk('achivements/deleteAchivement', async (id) => {
//   try {
//     const res = await AchivementService.delete(id)
//     return id
//   } catch (error) {
//     console.log(error)
//   }
// })

const initialState = {
    achivements: [],
    loading: false,
    error: '',
    achivement: null,
}

const achivementSlice = createSlice({
    name: 'achivements',
    initialState,
    reducers: {},
    extraReducers: {
        // GET ALL achivements
        [getAll.pending]: (state) => {
            state.loading = true
        },
        [getAll.fulfilled]: (state, action) => {
            state.loading = false
            state.achivements = action.payload
        },
        [getAll.rejected]: (state, action) => {
            state.loading = false
            state.achivements = []
        },

        //GET BY ID achivement

        //
        [getAchivementById.pending]: (state) => {
            state.loading = true
        },
        [getAchivementById.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.achivement = payload
        },
        [getAchivementById.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // ADD achivement

        //
        [addAchivement.pending]: (state) => {
            state.loading = true
        },
        [addAchivement.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.achivements = [...state.achivements, payload]
        },
        [addAchivement.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // Update Achivement

        [updateAchivement.pending]: (state) => {
            state.loading = true
        },
        [updateAchivement.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.achivement = { ...state.achivement, ...payload }
        },
        [updateAchivement.rejected]: (state) => {
            state.loading = false
        },

        //DELETE achivement

        //
        // [deleteAchivement.pending]: (state) => {
        //   state.loading = true
        // },
        // [deleteAchivement.fulfilled]: (state, { payload }) => {
        //   const deleteAchivement = [...state.achivements].filter(
        //     (achivement) => achivement.id !== payload,
        //   )
        //   return {
        //     ...state,
        //     loading: false,
        //     achivements: deleteAchivement,
        //   }
        // },
        // [deleteAchivement.rejected]: (state, { payload }) => {
        //   state.loading = false
        //   // state.achivement = {}
        //   state.error = payload
        // },
    },
})

export default achivementSlice.reducer
