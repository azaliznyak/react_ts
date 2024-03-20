import {FC, PropsWithChildren, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {carActions} from "../../redux/slices/carSlice";
import {ICar} from "../../interfaces";

interface IProps extends PropsWithChildren {
car:ICar
}

const Car: FC<IProps> = ({car}) => {
    const { id, brand, year,price}=car



    return (
        <div>
            <div>id:{id}</div>
            <div>brand:{brand}</div>
            <div>year:{year}</div>
            <div>price:{price}</div>


        </div>
    );
};

export {Car};