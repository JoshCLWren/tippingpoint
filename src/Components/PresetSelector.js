import React, {useState, useContext} from 'react';
import "./main.css";
import {PRESETS} from "./presets";
import { MileContext } from './MileContext';


const PresetSelector = () => {
    const {totalMiles, setTotalMiles} = useContext(MileContext);
    const onTotalMileChange = (event) => {
        setTotalMiles(event.target.value)    
      };

    return(

            <div>
                <label>
                    <h3>Select a preset for your trip (these are round trips from the warehouse and back)</h3>
                    <select onChange={onTotalMileChange}>
                        <option value="0">Custom Trip</option>
                        {
                        Object.entries(PRESETS).map(([campus, mileage]) => (
                        <option key={campus} value={mileage}>
                            {campus}
                        </option>
                        ))} 
                    </select>
                </label>
                trip total miles = {totalMiles}
            </div>

    )
}

export default PresetSelector;