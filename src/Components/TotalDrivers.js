import React, {useState, useContext} from 'react';
import "./main.css";
import { MileContext } from './MileContext';


const TotalDrivers = () => {
    const {drivers, setDrivers} = useContext(MileContext);
    const onDriverChange = (event) => {
        setDrivers(event.target.value)    
      };

    return(

        <div>
            <p>Total Drivers</p>
            <label>
            <select value={drivers} onChange={onDriverChange}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            </label>
            Drivers = {drivers}
        </div>
    )
}

export default TotalDrivers;



