import React from 'react'
import { useMileDispatch, useMileState } from './MileContext';

const TotalButton = () => {

  const dispatch = useMileDispatch()
  const {rental26Fees, mealCost,  truck26Fuel, hotelTotalCost, truck26Total} = useMileState()

  const handleClick = () => {
    dispatch({type: 'calculateTotals'});
    console.log("rental26 fees :" + rental26Fees);
    console.log("truck26total: " + truck26Total);
  }


  return (
    <>
      <div>
        <button type="button" onClick={handleClick}>
          CALCULATE
        </button>
      </div>
    </>
  );

}

export default TotalButton;

// case "calculateTotals":{
//   return {...state,
//       vanTotal: vanTotal(state.labor, state.gas, state.hotelTotalCost, state.mealCost),
//       truck26Total: truck26Total(state.rental26Fees, state.mealCost, state.diesel, state.hotelTotalCost),
//       truck16Total: truck16Total(state.rental16Fees, state.mealCost, state.diesel, state.hotelTotalCost)
//   }}

// onChange={(event) => dispatch({type: 'totalMilesUpdate', payload: event.target.value})}