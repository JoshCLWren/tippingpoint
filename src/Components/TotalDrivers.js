import React, {useState, useContext} from 'react';
import "./main.css";
import { MileProvider, useMileState, useMileDispatch } from './MileContext';


const TotalDrivers = () => {
    const {drivers} = useMileState()
    const dispatch = useMileDispatch()

    return(

        <div>
            <p>Total Drivers</p>
            <label>
            <select value={drivers} onChange={(event) => dispatch({type: 'driversUpdate', payload: event.target.value})}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            </label>
            Drivers = {drivers}
        </div>
    )
}

export default TotalDrivers;



