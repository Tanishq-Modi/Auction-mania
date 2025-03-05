import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authFeature";
import { toast } from "react-toastify";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Register User
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        const response = await authService.register(userData);
        localStorage.setItem("user", JSON.stringify(response));
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        const response = await authService.login    (userData);
        localStorage.setItem("user", JSON.stringify(response));
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await authService.logOut( );
        localStorage.removeItem("user");
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const getLogInStatus = createAsyncThunk("auth/status", async (_, thunkAPI) => {
    try {
        return await authService.getLogInStatus();
       
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const getuserProfile = createAsyncThunk("auth/profile", async (_, thunkAPI) => {
    try {
        return await authService.getuserProfile();
       
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        RESET(state) {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload; 
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload; 
                state.user = null;
                toast.error(action.payload);   
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload; 
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload; 
                state.user = null;
                toast.error(action.payload);   
            })
            .addCase(logOut.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = null;
                toast.success(action.payload)
            })
            .addCase(logOut.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload; 
                toast.error(action.payload);   
            })
            .addCase(getLogInStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLogInStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = action.payload;
            })
            .addCase(getLogInStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;    
            })
            .addCase(getuserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getuserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
                localStorage.setItem("user",JSON.stringify(action.payload));
            })
            .addCase(getuserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload; 
                localStorage.removeItem("user");
                state.isLoggedIn=true;   
            });
    },
});

export const { RESET } = authSlice.actions;

export const selectIsLoggedIn= state=>state.auth.isLoggedIn;
export const selectUser= state=>state.auth.user;
export const selectIsSuccess= state=>state.auth.isSuccess;

export default authSlice.reducer;