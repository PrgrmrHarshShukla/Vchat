import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        value: localStorage.getItem('currentUserInfoFireChat') ?
            JSON.parse(localStorage.getItem('currentUserInfoFireChat'))
            :
            {
                userName: "",
                email: "",
                rooms: []
            }
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('currentUserInfoFireChat', JSON.stringify(action.payload));
        },
        clearUser: (state) => {
            state.value = {
                userName: "",
                email: "",
                rooms: []
            };
            localStorage.removeItem('currentUserInfoFireChat');
        },
        updateUserRooms: (state, action) => {
            state.value.rooms.push(action.payload);
            localStorage.setItem('currentUserInfoFireChat', JSON.stringify(state.value));            
        }
    }
})



export const { setUser, clearUser, updateUserRooms } = userSlice.actions;

export default userSlice.reducer;
