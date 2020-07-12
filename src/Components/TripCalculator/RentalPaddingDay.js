import React, {useState, useContext, useEffect} from 'react';
import "./main.css";
import {PRESETS} from "../../unUsedComponents/presets";
import { MileProvider, useMileDispatch, useMileState } from './MileContext';
// import {useCalculateTotals} from "./CalculateTotals";


const RentalPaddingDay = () => {

    const dispatch = useMileDispatch()
    return(

        <div>
            <p>Adjust the Rental Padding Day or add extra days to truck rental?</p>
                <input
                    type="number"
                    name="rentalPaddingDay"
                    min="1"
                    defaultValue="1"
                    onChange={(event) => dispatch({type: 'rentalPaddingDayChange', payload: event.target.value})}
                />
      </div>

    )
}

export default RentalPaddingDay;