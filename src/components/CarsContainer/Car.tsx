import React, {FC, PropsWithChildren, SyntheticEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {carActions} from "../../redux/slices/carSlice";
import {ICar} from "../../interfaces";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {IState} from "../../types";

interface IProps extends PropsWithChildren {
car:ICar,
    expanded:string,
    setExpanded:IState<string>
}

const Car: FC<IProps> = ({car, setExpanded, expanded}) => {
    const { id, brand, year,price}=car

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : null);
        };



    return (
        <div>
            <Accordion key={id} expanded={expanded===`${id}`} onChange={handleChange(`${id}`)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {id} - {brand}
                    </Typography>

                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div>id:{id}</div>
                        <div>brand:{brand}</div>
                        <div>year:{year}</div>
                        <div>price:{price}</div>
                    </Typography>
                </AccordionDetails>
            </Accordion>



        </div>
    );
};

export {Car};