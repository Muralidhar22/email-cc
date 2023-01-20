import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { BASE_URL } from "../../constants/urls";

const initialState = {
    loading: false,
    data: null,
    error: null
}

export const fetchEmailBody = createAsyncThunk('emailBody/fetchEmailBody',async (id, { rejectWithValue }) => {
    try{
        const response = await fetch(`${BASE_URL}?id=${id}`)
        if(response.ok) {
            const result = await response.json()
            return { body: result.body };
        }
        throw new Error(response.statusText)
    } catch (error) {
            return rejectWithValue(error.message ? error.message : 'something went wrong!')
        }
})

export const emailBodySlice = createSlice({
    name: 'emailBody',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchEmailBody.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchEmailBody.fulfilled, (state, action) => {
                state.data = action.payload.body
                state.loading = false
            })
            .addCase(fetchEmailBody.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

export default emailBodySlice.reducer;