import React from 'react';
import "./main.css";
import {useMileState, useMileDispatch } from './MileContext';
// import {useCalculateTotals} from "./CalculateTotals";


const DetailedExpenses = () => {
    
    const {totalMiles, drivingDays, hotelNights, hotelTotal, meals, mealCost, hours, labor, vanFuelExpense, gas, diesel, rental26Fees, rental16Fees, truck16Fuel, truck26Fuel} = useMileState()
    const dispatch = useMileDispatch()
    const dispatchActions = (event) => {
        dispatch({type: 'gasOverride', payload: event.target.value})
    }

    return(

            <div>
                <p>Total Miles of Trip  {totalMiles}</p>
                <p>Driving days      {drivingDays}</p>
                <p>Nights         {hotelNights}</p>
                <p>Hotel cost       ${hotelTotal}</p>
                <p>Meals         {meals}</p>
                <p>Meals Cost       ${mealCost}</p>
                <p>hours         {hours}</p>
                <p>Labor cost       ${labor}</p>
                <p>Van Fuel cost     ${vanFuelExpense.toFixed(2)}</p>
                <div>
                    Gas Price Override
                    <input 
                        type="number"
                        name="gas"
                        min="0"
                        defaultValue={gas}
                        onChange={(event) => dispatch({type: 'gasOverride', payload: event.target.value})}                      
                    />
                </div>           

                <div>
                    Diesel Price Override
                    <input 
                        type="number"
                        name="diesel"
                        min="0"
                        defaultValue={diesel}
                        onChange={(event) => dispatch({type: 'dieselOverride', payload: event.target.value})}                      
                    />
                </div>
                

                <p>Rental Fees For a 26 foot truck      ${rental26Fees.toFixed(2)}</p>
                <p>Diesel Cost    ${truck26Fuel.toFixed(2)}</p>
                <p>Rental Fees For a 16 foot truck      ${rental16Fees.toFixed(2)}</p>
                <p>Diesel Cost    ${truck16Fuel.toFixed(2)}</p>
            </div>

    )
}

export default DetailedExpenses;


