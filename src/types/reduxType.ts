import {store} from "../redux/store";

type RootState=ReturnType<typeof store.getState>   //щоб функція useSelectore знала що знаходиться в ній
type AppDispatch=typeof store.dispatch

export type {
    RootState, AppDispatch
}