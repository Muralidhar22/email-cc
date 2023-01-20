import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected: { read: false }
}

const appliedFilter = createSlice({
    name: 'filter',
    initialState,
    reducers:{
        updatedFilter(state, action) {
            state.selected = action.payload
        }
    }
})

export const { updatedFilter } = appliedFilter.actions;

export default appliedFilter.reducer;