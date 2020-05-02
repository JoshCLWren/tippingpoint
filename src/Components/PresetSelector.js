import React, {useState, useContext} from 'react';
import "./main.css";
import {PRESETS} from "./presets";
import { MileContext } from './MileContext';
import {CalculateTotals} from "./CalculateTotals";


const PresetSelector = () => {
    const {totalMiles, setTotalMiles, hotelCost, hotelDays, hotelTotal, drivingDays, drivers,
            hours, meals, laborCost, truck26Total, truck16Total, vanTotal, mealCost, vanFuelCost,
            rental26Cost, rental16Cost, truck26Fuel, truck16Fuel, rentalPaddingDay, trip, locationOne,
            locationTwo, gas, diesel

        } = useContext(MileContext);
    const onTotalMileChange = (event) => {
        setTotalMiles(event.target.value, CalculateTotals())    
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
                <div>
                    State Values--
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
                    diesel: {diesel}
                </div>
            </div>

    )
}

export default PresetSelector;