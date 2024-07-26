import { createSlice } from "@reduxjs/toolkit";

const APP_USER = "PER__USER";
const APP_USER_TOKEN = "PER__USER_TOKEN";

const initialState = {
  data: localStorage.getItem(APP_USER)
    ? JSON.parse(localStorage.getItem(APP_USER))
    : null,
  token: localStorage.getItem(APP_USER_TOKEN)
    ? JSON.parse(localStorage.getItem(APP_USER_TOKEN))
    : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem(
        APP_USER,
        action.payload ? JSON.stringify(action.payload) : null
      );

      state.data = action.payload;
    },
    setToken: (state, action) => {
      localStorage.setItem(
        APP_USER_TOKEN,
        action.payload ? JSON.stringify(action.payload) : null
      );
      state.token = action.payload;
    },
    setUserNull:(state,action)=>{
      localStorage.removeItem('APP_USER_TOKEN');
      state.token = action.payload;
    }
  },
});


export const { setUser, setToken,setUserNull } = userSlice.actions;

export default userSlice.reducer;
