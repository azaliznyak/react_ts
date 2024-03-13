import {SubmitHandler, useForm} from "react-hook-form";
import {ICar} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {carsActions} from "../../store";
import {useEffect} from "react";

const CarForm = () => {
    const {handleSubmit,reset,register,setValue}=useForm<ICar>();
    const dispatch=useAppDispatch();
    const{carForUpdate}=useAppSelector(state => state.cars);

    useEffect(()=>{
        if (carForUpdate){
            setValue('brand', carForUpdate.brand)
            setValue('year', carForUpdate.year)
            setValue('price', carForUpdate.price)
        }
    },[setValue, dispatch,carForUpdate])


    const save: SubmitHandler<ICar> = (car) => {
 dispatch(carsActions.create({car}))
        reset()
    }
    const update: SubmitHandler<ICar> = (car) => {
      dispatch(carsActions.updateById({car, id:carForUpdate.id}))
        reset()
    }

    return (
        <form onSubmit={handleSubmit(carForUpdate? update:save)}>
            <input type="text" placeholder={'brand'} {...register('brand')}/>
            <input type="text" placeholder={'year'} {...register('year')}/>
            <input type="text" placeholder={'price'} {...register('price')}/>
            <button>{carForUpdate? 'update': 'save'}</button>
        </form>
    );
};

export {CarForm};