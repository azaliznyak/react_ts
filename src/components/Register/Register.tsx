import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const {register, handleSubmit, }=useForm<IAuth>();
    const dispatch=useAppDispatch()
    const {registerError}=useAppSelector(state => state.auth);
    const navigate=useNavigate()

    const reg:SubmitHandler<IAuth> = async (user) => {
const {meta:{requestStatus}}=await dispatch(authActions.register({user}))
        if (requestStatus==='fulfilled'){
            navigate('/login')
        }
    }

    return (
        <div>
            {registerError &&<h5>{registerError}</h5>}
        <form onSubmit={handleSubmit(reg)}>
            <input type="text" placeholder={'username'} {...register('username')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button>register</button>

        </form>
        </div>
    );
};

export {Register};