import React from 'react';
import {Users} from "../components";
import {Outlet} from "react-router-dom";

const UsersPage = () => {
    return (
        <div>
            <Outlet/>
            <hr/>
            <Users/>
            
        </div>
    );
};

export {UsersPage};