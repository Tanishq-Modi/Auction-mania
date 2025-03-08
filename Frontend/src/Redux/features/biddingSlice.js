import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import biddingSerivce from '../services/biddingFeature';
import { toast } from 'react-toastify';

const initialState = {
    history: [],
    bidding: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const placebid = createAsyncThunk("bid/create", async ({price, productId}, thunkAPI) => {
    try {
        return await biddingSerivce.placebid({price, productId});
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const fetchBiddingHistory = createAsyncThunk("bid/get", async (productId, thunkAPI) => {
    try {
        return await biddingSerivce.fetchBiddingHistory(productId);
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const sellproductsbyuser = createAsyncThunk("bid/sell", async (productId, thunkAPI) => {
    try {
        return await biddingSerivce.sellproductsbyuser(productId);
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

const biddingSlice = createSlice({
  name: "bidding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
            builder
                .addCase(placebid.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(placebid.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.message = action.payload.message;
                    toast.success("Bid has been placed!"); 
                })
                .addCase(placebid.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.bidding = action.payload;
                    state.message = action.payload; 
                    toast.error(action.payload);   
                })
                .addCase(sellproductsbyuser.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(sellproductsbyuser.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.message = action.message;
                })
                .addCase(sellproductsbyuser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload; 
                    toast.error(action.payload);   
                })
                .addCase(fetchBiddingHistory.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(fetchBiddingHistory.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.history = action.payload;
                })
                .addCase(fetchBiddingHistory.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload; 
                    toast.error(action.payload);   
                });
            },
});


export default biddingSlice.reducer