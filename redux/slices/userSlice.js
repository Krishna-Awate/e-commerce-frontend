import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userUpdate: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    userRoleUpdate: (state, action) => {
      state.userRole = action.payload;
    },
  },
});

export const { userUpdate, userRoleUpdate } = userSlice.actions;

export default userSlice.reducer;
