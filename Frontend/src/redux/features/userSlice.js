import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: true,
    selectedUser: null,
    messages: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },addMessage:(state,action)=>{
      state.messages.push(action.payload);
    }
  },
});

export const { setUserData, setSelectedUser,setMessages,addMessage } = userSlice.actions;

export default userSlice.reducer;
