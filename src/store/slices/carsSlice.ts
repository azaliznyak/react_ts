import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {ICar} from "../../interfaces";
import {carService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    cars:ICar[],
    carForUpdate:ICar,
    trigger:boolean
}
let initialState:IState={
    cars:[],
    carForUpdate:null,
    trigger:null
    
}

const getAll=createAsyncThunk<ICar[],void>(          //перше що буде повертати (ICar[]), а друге тк що буде приймати(void)
    'carsSlice/getAll',
    async (_,{rejectWithValue})=>{
        try {
            const {data}=await carService.getAll()
            return data

        }catch (e) {
            const err=e as AxiosError
            return rejectWithValue(err.response.data)

        }
    }
);
const create=createAsyncThunk<void, { car:ICar }>(
    'carsSlice/create',
    async ({car}, {rejectWithValue})=>{
        try {
            await carService.create(car)

        }catch (e) {
            const err=e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
);

const updateById=createAsyncThunk<void, { car: ICar, id:number }>(
    'carsSlice/updateById',
    async ({car, id}, {rejectWithValue})=>{
        try {
            await carService.updateById(id,car)
        }catch (e) {
            const err=e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const deleteById=createAsyncThunk<void, { id:number }>(
    'carsSlice/deleteById',
    async ({id}, {rejectWithValue})=>{
        try {
            await carService.deleteById(id)
        }catch (e) {
            const err=e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const carsSlice=createSlice({
    name:'carsSlice',
    initialState,
    reducers:{
        serCarForUpdate:(state,action)=>{
            state.carForUpdate=action.payload
        }
    },
    extraReducers:builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars=action.payload
            })
            .addCase(updateById.fulfilled, state => {
                state.carForUpdate=null
            })
            .addMatcher(isFulfilled(create, updateById, deleteById), state => {
                state.trigger=!state.trigger
            })
})


const {reducer:carReducer, actions}=carsSlice

const carsActions={
    ...actions,
    getAll,
    create,
    updateById,
    deleteById
}

export {
    carsActions,carReducer
}