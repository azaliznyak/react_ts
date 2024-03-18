import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {IAuth, IUser} from "../../interfaces";
import {AxiosError} from "axios";
import {apiService, authService} from "../../services";

interface IState {
    registerError: string
    loginError:string,
    currentUser:IUser
}

let initialState: IState = {
    registerError: null,
    loginError:null,
    currentUser:null
}

const register = createAsyncThunk<void, { user: IAuth }>(
    'authSlice/register',
    async ({user}, {rejectWithValue}) => {
        try {
            await authService.register(user)

        } catch (e) {
            const err=e as AxiosError
            return rejectWithValue(err.response.data)

        }
    }
)

const login=createAsyncThunk<IUser, {user:IAuth}>(
    'authSlice/login',
    async ({user}, {rejectWithValue})=>{
        try {
            // const сurrentUser =await authService.login(user)
            return await authService.login(user)               //повертає юзера
        }catch (e) {
            const err=e as AxiosError
            return rejectWithValue(err.response.data)

        }
    }
)

const me= createAsyncThunk<IUser, void>(
    'authSlice/me',
    async (_, {rejectWithValue})=>{
        try {
            const {data}=await authService.me()
            return data
        }catch (e) {
            const err=e as AxiosError
            return rejectWithValue(err.response.data)
        }

    }
)
const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers:builder =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.currentUser=action.payload
            })
            .addCase(register.rejected, state => {
                state.registerError='Username already exist'
            })
            .addCase(login.rejected, state => {
                state.loginError='Incorrect password or username'
            })
            .addCase(me.fulfilled, (state, action) => {
                state.currentUser=action.payload
            })
            .addMatcher(isFulfilled(register, login), state => {
                state.registerError=null;
                state.loginError=null
            })

})

const {reducer:authReducer, actions}=authSlice

const authActions={
    ...actions,
    register,
    login,
    me
}

export {
    authReducer,
    authActions
}