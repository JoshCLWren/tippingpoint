import React, {useState, useContext, useEffect} from 'react';
import "./main.css";
import {PRESETS} from "./presets";
import { MileProvider, useMileDispatch, useMileState } from './MileContext';
// import {useCalculateTotals} from "./CalculateTotals";


const PresetSelector = () => {
    
    const {totalMiles} = useMileState()
    const dispatch = useMileDispatch()
    return(

            <div>
                <label>
                    <h3>Select a preset for your trip (these are round trips from the warehouse and back)</h3>
                    <select onChange={(event) => dispatch({type: 'totalMilesUpdate', payload: event.target.value})}>
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
                <div>Trip total miles = {totalMiles}</div>
                    {/* State Values--
                    totalMiles: {totalMiles},
                    hotelCost: {hotelCost},
                    hotelDays:  {hotelDays},
                    hotelTotal: {hotelTotal},
                    drivingDays: {drivingDays},
                    drivers: {drivers},
                    hours: {hours},
                    meals: {meals},
                    laborCost: {laborCost},
                    truck26Total: {truck26Total},
                    truck16Total: {truck16Total},
                    vanTotal: {vanTotal},
                    mealCost: {mealCost},
                    vanFuelCost: {vanFuelCost},
                    rental26Cost: {rental26Cost},
                    rental16Cost: {rental16Cost},
                    truck26Fuel: {truck26Fuel},
                    truck16Fuel: {truck16Fuel},
                    rentalPaddingDay: {rentalPaddingDay},
                    trip: {trip},
                    locationOne: {locationOne},
                    locationTwo: {locationTwo},
                    gas: {gas},
                    diesel: {diesel} */}
                </div>
            </div>

    )
}

export default PresetSelector;