import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {carActions} from "../../redux/slices/carSlice";
import { Car } from './Car';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Cars = () => {
    const {cars} = useAppSelector(state => state.cars);
    const dispatch = useAppDispatch();

    const [expanded, setExpanded] = useState<string>(null);


    useEffect(() => {
        dispatch(carActions.getAll())
    }, [])


    return (
        <div>
            {cars.map(car=><Car key={car.id} car={car} expanded={expanded} setExpanded={setExpanded} />)}


        </div>
    );
};

export {Cars};