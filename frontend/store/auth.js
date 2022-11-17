import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    loginAction: (initialState, action) => {
      initialState.isLoggedIn = true;
    },
    logoutAction: (initialState, action) => {
      initialState.isLoggedIn = false;
    },
    loggedIn: (initialState, action) => {
      initialState.isLoggedIn = true;
    },
    loggedInSuccessfully: (initialState, action) => {
      initialState.isLoggedIn = true;
    },
    loginFailure: (initialState, action) => {
      initialState.isLoggedIn = false;
    },
    loggedOutSuccessfully: (initialState, action) => {
      initialState.isLoggedIn = false;
    },
    sessionExpired: (initialState, action) => {
      initialState.isLoggedIn = false;
    },
  },
});

export const {
  loginAction,
  logoutAction,
  loggedInSuccessfully,
  loggedOutSuccessfully,
  loggedIn,
  logoutFailure,
  sessionExpired,
} = authSlice.actions;
export default authSlice.reducer;
