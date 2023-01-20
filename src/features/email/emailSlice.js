import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { BASE_URL } from "../../constants/urls";
import { getPersistedEmailStatus, persistEmailList } from "../../utils/persistEmailState";

export const persistedEmailStatus = getPersistedEmailStatus();

const initialState = {
    page: 1,
    total: null,
    error: null,
    loading: false,
    list: null,
    filteredList: null,
}

export const fetchEmailList = createAsyncThunk('email/fetchEmailList',async (filter, { rejectWithValue, getState }) => {
    const page = getState().email.page;
    try{
        const response = await fetch(`${BASE_URL}?page=${page}`)
        if(response.ok) {
            let result = await response.json()
            const emailList = result.list.map(email => (
                {
                    ...email,
                    favorite: (persistedEmailStatus
                                 &&
                                 persistedEmailStatus.favorite
                                 &&
                                 persistedEmailStatus.favorite.includes(email.id)) ? true : false,
                    read: (persistedEmailStatus
                            &&
                            persistedEmailStatus.read
                            &&
                            persistedEmailStatus.read.includes(email.id)) ? true : false,
                }
            ))
            persistEmailList(emailList, page)
            return { list: emailList, total: result.total, filter };
        }
        throw new Error(response.statusText)
    } catch (error) {
        return rejectWithValue(error.message ? error.message : 'something went wrong!')
    }
})

const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        updateFavorite(state, action){
            state.list = state.list.map((item) => (
                item.id === action.payload.emailId
                ? {...item, favorite: action.payload.favorite}
                : item
            ))
        },
        updateRead(state, action){
            state.list = state.list.map((item) => (
                item.id === action.payload.emailId
                ? {...item, read: action.payload.read}
                : item
            ))
        },
        currentPage(state, action){
            state.page = action.payload.page
        },
        updateList(state, action) {
            const filterKey = Object.keys(action.payload.filter)[0]
            state.list = action.payload.list
            state.filteredList = action.payload.list.filter((email) => (
                email[filterKey] === action.payload.filter[filterKey]
            ))
        },
        setFilteredList(state, action) {
            const filterKey = Object.keys(action.payload.filter)[0]
            if(state.list){
                state.filteredList = state.list.filter((email) => (
                    email[filterKey] === action.payload.filter[filterKey]
                ))
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchEmailList.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchEmailList.fulfilled,(state,action) => {
                const filterKey = Object.keys(action.payload.filter)[0]
                if(!state.total) {
                    state.total = action.payload.total
                }
                state.list = action.payload.list
                state.loading = false
                state.filteredList = action.payload.list.filter((email) => (
                    email[filterKey] === action.payload.filter[filterKey]
                ))
            })
            .addCase(fetchEmailList.rejected, (state, action) => {
                state.error =  action.payload
                state.loading = false
            });
    }
});

export const { updateFavorite, updateRead, currentPage, updateList, setFilteredList } = emailSlice.actions
export default emailSlice.reducer;