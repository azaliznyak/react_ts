import React, {FC} from 'react';
import {IUser} from "../../interfaces";
import {useNavigate} from "react-router-dom";

interface IProps {
    user:IUser
    
}

const User:FC<IProps> = ({user}) => {
    const{id, name ,username}=user

    const navigate=useNavigate()
    return (
        <div>
            <div>id:{id}</div>
            <div>name:{name}</div>
            <div>username:{username}</div>
            <button onClick={()=>navigate(id.toString(), {state:{user}})}>Details</button>

        </div>
    );
};

export {User};