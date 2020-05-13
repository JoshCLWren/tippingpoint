import React, {useState, useContext, useEffect} from 'react';
import "./main.css";
import {PRESETS} from "./presets";
import { MileProvider, useMileDispatch, useMileState } from './MileContext';
// import {useCalculateTotals} from "./CalculateTotals";


const CustomMiles = () => {
    
    const dispatch = useMileDispatch()
    return(

        <div>            
            <p>Mile Override</p>
                <input 
                    type="number"
                    name="totalMiles"
                    min="0"                    
                    defaultValue="0"
                    onChange={(event) => dispatch({type: 'totalMilesUpdate', payload: event.target.value})}                      
                />
      </div>

    )
}

export default CustomMiles;

