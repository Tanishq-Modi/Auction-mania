import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categorySerivce from '../services/categoryService';
import { toast } from 'react-toastify';

const initialState = {
    categorys: [],
    category: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createCategory = createAsyncThunk("category/create", async (formData, thunkAPI) => {
    try {
        return await categorySerivce.createCategory(formData);
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const updateCategory = createAsyncThunk("category/update", async ({id,formData}, thunkAPI) => {
    try {
        return await categorySerivce.updateCategory(id, formData);
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const getAllCategory = createAsyncThunk("category/getall", async (_, thunkAPI) => {
    try {
        return await categorySerivce.getAllCategory();
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const deleteCategory = createAsyncThunk("category/delete", async (id, thunkAPI) => {
    try {
        return await categorySerivce.deleteCategory(id);
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
          builder
              .addCase(createCategory.pending, (state) => {
                  state.isLoading = true;
              })
              .addCase(createCategory.fulfilled, (state, action) => {
                  state.isLoading = false;
                  state.isSuccess = true;
                  state.isError = false;
                  toast.success("Category has been created!"); 
              })
              .addCase(createCategory.rejected, (state, action) => {
                  state.isLoading = false;
                  state.isError = true;
                  state.message = action.payload; 
                  toast.error(action.payload);   
              })
              .addCase(updateCategory.pending, (state) => {
                  state.isLoading = true;
              })
              .addCase(updateCategory.fulfilled, (state, action) => {
                  state.isLoading = false;
                  state.isSuccess = true;
                  state.isError = false;
                  toast.success("Category has been updated!"); 
              })
              .addCase(updateCategory.rejected, (state, action) => {
                  state.isLoading = false;
                  state.isError = true;
                  state.message = action.payload; 
                  toast.error(action.payload);   
              })
              .addCase(getAllCategory.pending, (state) => {
                  state.isLoading = true;
              })
              .addCase(getAllCategory.fulfilled, (state, action) => {
                  state.isLoading = false;
                  state.isSuccess = true;
                  state.isError = false;
                  state.category=action.payload;
              })
              .addCase(getAllCategory.rejected, (state, action) => {
                  state.isLoading = false;
                  state.isError = true;
                  state.message = action.payload; 
              })
              .addCase(deleteCategory.pending, (state) => {
                  state.isLoading = true;
              })
              .addCase(deleteCategory.fulfilled, (state, action) => {
                  state.isLoading = false;
                  state.isSuccess = true;
                  state.isError = false;
                  toast.success("Category has been deleted!"); 
              })
              .addCase(deleteCategory.rejected, (state, action) => {
                  state.isLoading = false;
                  state.isError = true;
                  state.message = action.payload; 
                  toast.error(action.payload);
              });
            }
});

export default categorySlice.reducer
