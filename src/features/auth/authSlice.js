import authService from "./authService";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const userExists = localStorage.getItem('user')


const initialState = {
    user : userExists ? JSON.parse(userExists) : null,
    isLoading : false,
    isError : false,
    isSuccess : false,
    message : ""
}


const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {

    },
    extraReducers : (builder) => {
        builder
        .addCase(register.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected , (state , action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.user = null
            state.message = action.payload
        })
        .addCase(login.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected , (state , action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.user = null
            state.message = action.payload
        })
        .addCase(logout.fulfilled , (state) => {
            state.user = null
        })
    }
})



export const register = createAsyncThunk('auth/register' , async(user , thunkAPI)=>{
   try {
    return await authService.register(user)
   } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
   }
})

export const login = createAsyncThunk('auth/login' , async(user , thunkAPI)=>{
    try {
     return await authService.login(user)
    } catch (error) {
         const message = error.response.data.message
         return thunkAPI.rejectWithValue(message)
    }
 })

export const logout = createAsyncThunk('auth/logout' , async()=>{
    localStorage.removeItem('user')
})


export default authSlice.reducer