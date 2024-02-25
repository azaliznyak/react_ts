import React, {FC, PropsWithChildren} from 'react';
import {createContext} from "react";


const FirstContext=createContext<number>(null);
const SecondContext=createContext<{name:string}>(null)
interface IProps extends PropsWithChildren{

}

const ContextProvider:FC<IProps> = ({children}) => {
    return (
        <div>
            <FirstContext.Provider value={444}>
                <SecondContext.Provider value={{name:'max'}}>
                    {children}
                </SecondContext.Provider>

            </FirstContext.Provider>

        </div>
    );
};

export {ContextProvider, FirstContext, SecondContext};