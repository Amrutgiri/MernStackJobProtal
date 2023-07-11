import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
    },
    reducers: {
        setUsers: (state, action) => {
            state.user = action.payload
        },
    },
});

export const {setUsers}= authSlice.actions