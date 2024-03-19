import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LegalService from "src/services/LegalService";

export const fetchLegalService = createAsyncThunk('legalService/fetchLegalService', async () => {
    try {
        const res = await LegalService.fetchLegalService()
        return res.data.data
    } catch (error) {
        console.log(error);
    }
})

export const getByIdLegalService = createAsyncThunk('legalService/getByIdLegalService', async (id) => {
    try {
        const res = await LegalService.getLegalServiceById(id)
        return await res.data.data
    } catch (error) {
        console.log(error)

    }
}
)

export const addLegalService = createAsyncThunk("legalService/addLegalService", async (data) => {
    try {
        const res = await LegalService.addLegalService(data)
        return res.data.data
    } catch (error) {
        console.log(error);
    }
})

export const updateLegalService = createAsyncThunk("legalService/updateLegalService", async (data) => {
    try {
        // const id = data.id
        const res = await LegalService.updateLegalService(data);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }

});

export const deleteLegalService = createAsyncThunk("legalService/deleteLegalService", async (id) => {
    try {
        const res = await LegalService.deleteLegalService(id)
        return id
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    loading: false,
    error: "",
    legalServices: [],
    legalService: {
        id: undefined,
        image: "",
        title: ""
    }

}

const legalServiceSlice = createSlice({
    name: "legalService",
    initialState,
    reducers: {},
    extraReducers(builder) {

        // GET ALL Legal Service
        builder
            .addCase(fetchLegalService.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchLegalService.fulfilled, (state, { payload }) => {
                state.loading = false
                state.legalServices = payload
            })
            .addCase(fetchLegalService.rejected, (state, { payload }) => {
                state.loading = false
                state.legalServices = []
                state.error = payload
            })

        // Add Legal Service
        builder
            .addCase(addLegalService.pending, (state) => {
                state.loading = true
            })
            .addCase(addLegalService.fulfilled, (state, { payload }) => {
                state.loading = false
                state.legalServices = [...state.legalServices, payload]
            })
            .addCase(addLegalService.rejected, (state, { payload }) => {
                state.loading = false
                state.legalServices = []
                state.error = payload
            })

        //GET BY ID Legal Service

        //
        builder
            .addCase(getByIdLegalService.pending, (state) => {
                state.loading = true
            })
            .addCase(getByIdLegalService.fulfilled, (state, { payload }) => {
                state.loading = false
                state.legalService = payload
            })
            .addCase(getByIdLegalService.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })


        //  UPDATE Legal Service
        builder
            .addCase(updateLegalService.pending, (state) => {
                state.loading = true
            })
            .addCase(updateLegalService.fulfilled, (state, payload) => {
                state.loading = false
                const index = state.legalServices.find((legalService) => legalService.id === payload.id)
                if (index) {
                    const { title, image } = payload
                    index.title = title
                    index.image = image
                }
            })
            .addCase(updateLegalService.rejected, (state, payload) => {
                state.loading = false
                state.legalService = {
                    id: undefined,
                    title: '',
                    image: "",

                }
                state.error = payload
            })

        // DELETE Legal Service
        builder
            .addCase(deleteLegalService.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteLegalService.fulfilled, (state, { payload }) => {

                state.loading = true
                state.legalServices = state.legalServices.filter((legalService) => legalService.id !== payload)

            })
            .addCase(deleteLegalService.rejected, (state, payload) => {
                state.loading = false
                state.legalServices = []
                state.error = payload
            })

    }
})
export default legalServiceSlice.reducer