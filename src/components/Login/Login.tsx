import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "../../interfaces";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";

const Login = () => {
    const {register, handleSubmit}=useForm<IAuth>();
    const dispatch=useAppDispatch();
    const {loginError}=useAppSelector(state => state.auth);
    const navigate=useNavigate()
    const {state}=useAppLocation<{pathname:string}>()

    const login:SubmitHandler<IAuth> = async (user) => {
        const {meta:{requestStatus}}=await dispatch(authActions.login({user}))
        if (requestStatus==='fulfilled'){
            navigate(state?.pathname ||'/cars')
        }

    }

    return (
        <div>
            {loginError && <h5>{loginError}</h5>}
            <form onSubmit={handleSubmit(login)} style={{margin:'10px 0', display:'flex', alignItems:'center'}}>
                <TextField  label="Username" variant="outlined" {...register('username')} />
                <TextField  label="Password" variant="outlined" {...register('password')} />
                <Button variant={'contained'}>Login</Button>

            </form>
        </div>

    );
};

export {Login};