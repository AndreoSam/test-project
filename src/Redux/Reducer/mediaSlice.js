import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { create_url, delete_url, login_url, register_url, singleProd_url, update_url, view_url } from "../../api/apiosInstance";

//registration
export const registerUser = createAsyncThunk("post/registerUser", async (data) => {
    const res = await axios.post(register_url, data);
    console.log("Registration Slice: ", res);
    return res?.data;
});

//Login
export const loginUser = createAsyncThunk("post/loginUser", async (data) => {
    const res = await axios.post(login_url, data);
    console.log("login slice: ", res);
    return res?.data;
});

const initialValues = {
    userData: [],
    loading: false,
    error: null,
    token: null,
};


export const mediaSlice = createSlice({
    name: "Slice",
    initialState: initialValues,

    extraReducers: (builder) => {
        //Registration
        builder.addCase(registerUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action);
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });
        //Registration ends

        //get user
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            console.log("Fulfilled action: ", action);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });
        //get user ends
    }
})

export default mediaSlice.reducer;