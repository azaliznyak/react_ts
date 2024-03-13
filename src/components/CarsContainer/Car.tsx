import {FC, PropsWithChildren} from "react";
import {ICar} from "../../interfaces";

import {carsActions} from "../../store";
import {useAppDispatch} from "../../hooks";

interface IProps extends PropsWithChildren {
car:ICar
}

const Car : FC<IProps> = ({car}) => {
    const {id, brand, year, price}=car
    const dispatch=useAppDispatch()

 return (
  <div>
      <div>id:{id}</div>
      <div>brand:{brand}</div>
      <div>year:{year}</div>
      <div>price:{price}</div>
      <button onClick={()=>dispatch(carsActions.serCarForUpdate(car))}>update</button>
      <button onClick={()=>dispatch(carsActions.deleteById({id}))}>delete</button>

  </div>
 );
};

export {Car};

