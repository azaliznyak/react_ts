import {apiService} from "./apiService";
import {urls} from "../constants/urls";
import {AxiosResponse} from "axios";
import {ICar} from "../interfaces/carInterface";

const carService={
    getAll:():Promise<AxiosResponse<ICar[]>> =>apiService.get(urls.cars.base)
}