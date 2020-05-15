import React, {useState, useContext} from 'react';
import "./main.css";
import { MileProvider, useMileState, useMileDispatch } from './MileContext';
import {KEY_NUMBERS} from "./keyValues";



const TotalDrivers = () => {
    const {drivers} = useMileState()
    const dispatch = useMileDispatch()

    return(

        <div>
            <p>Total Drivers</p>
            <label>
            <select value={parseInt(drivers)} onChange={(event) => dispatch({type: 'driversUpdate', payload: parseInt(event.target.value)})}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            </label>

      
        </div>
    )
}

export default TotalDrivers;



