import React, {useState, useContext, useEffect} from 'react';
import "./main.css";
import {PRESETS} from "./presets";
import { MileProvider, useMileDispatch, useMileState } from './MileContext';
// import {useCalculateTotals} from "./CalculateTotals";


const PresetSelector = () => {
    
    const {totalMiles} = useMileState()
    const dispatch = useMileDispatch()
    const dispatchActions = (event) => {
        dispatch({type: 'setTotalMile', payload: parseInt(event.target.value)})
    }
    return(

            <div>
                <label>
                    <h3>Select a preset for your trip (these are round trips from the warehouse and back)</h3>
                    <select onChange={(event) => dispatchActions(event)}>
                        <option value="0">Custom Trip</option>
                        {
                        Object.entries(PRESETS).map(([campus, mileage]) => (
                        <option key={campus} value={mileage}>
                            {campus}
                        </option>
                        ))} 
                    </select>
                </label>

                <div>
                </div>
            </div>

    )
}

export default PresetSelector;