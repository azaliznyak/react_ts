import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {Car} from "./Car";
import {carsActions} from "../../store";


const Cars = () => {
    const {cars, trigger} = useAppSelector(state => state.cars);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(carsActions.getAll())
    }, [trigger, dispatch])

    return (
        <div>
            {cars.map(car => <Car key={car.id} car={car}/>)}
        </div>
    );
};

export {Cars};