import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productSerivce from '../services/productService';
import { toast } from 'react-toastify';

const initialState = {
    products: [],
    userproducts: [],
    wonedproducts: [],
    product: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createProduct = createAsyncThunk("product/create", async (formData, thunkAPI) => {
    try {
        return await productSerivce.createProduct(formData);
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const getAllProductOfUser = createAsyncThunk("product/get-user-products", async (_, thunkAPI) => {
    try {
        return await productSerivce.getAllProductOfUser();
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const getProduct = createAsyncThunk("product/get-product", async (id, thunkAPI) => {
    try {
        return await productSerivce.getProduct(id);
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const getAllProduct = createAsyncThunk("product/public/get-products", async (_, thunkAPI) => {
    try {
        return await productSerivce.getAllProduct();
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const getAllWonedProduct = createAsyncThunk("product/get-woned-user-products", async (_, thunkAPI) => {
    try {
        return await productSerivce.getAllWonedProduct();
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const deleteProduct = createAsyncThunk("product/delete", async (id, thunkAPI) => {
    try {
        return await productSerivce.deleteProduct(id);
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const updateProduct = createAsyncThunk("product/user/update", async ({id,formData}, thunkAPI) => {
    try {
        return await productSerivce.updateProduct(id,formData);
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.message) || error.message || error.toString() || error;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
            builder
                .addCase(createProduct.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(createProduct.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.products.push(action.payload);
                    toast.success("Product created successfully!"); 
                })
                .addCase(createProduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload; 
                    toast.error(action.payload);   
                })
                .addCase(getAllProduct.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(getAllProduct.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.products=action.payload;
                })
                .addCase(getAllProduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload; 
                })
                .addCase(getProduct.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(getProduct.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.product=action.payload;
                })
                .addCase(getProduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload; 
                })
                .addCase(getAllWonedProduct.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(getAllWonedProduct.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.wonedproducts=action.payload;
                })
                .addCase(getAllWonedProduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload; 
                })
                .addCase(getAllProductOfUser.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(getAllProductOfUser.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.userproducts=action.payload;
                })
                .addCase(getAllProductOfUser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload; 
                })
                .addCase(deleteProduct.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(deleteProduct.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    toast.success("Product Deleted successfully");
                })
                .addCase(deleteProduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    toast.error(action.payload);
                })
                .addCase(updateProduct.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(updateProduct.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    toast.success("Product updated successfully");
                })
                .addCase(updateProduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    toast.error(action.payload);
                });
            },
});

export const selectProduct= state=>state.product.product;

export default productSlice.reducer