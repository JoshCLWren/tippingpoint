import React,{useReducer, createContext} from 'react';
import {KEY_NUMBERS} from "./keyValues";

const MileStateContext = createContext();
const MileDispatchContext = createContext();

const initialState = {
    totalMiles: 0, 
    drivers: 1, 
    locationOne: "-97.4111604,35.4653761", 
    locationTwo: "-97.4111604,35.4653761",
    rentalPaddingDay: 1,
    hours: 0,
    meals: 0,
    mealCost: 0,
    drivingDays: 0,
    hotelNights: 0,
    hotelTotalCost: 0,
    gas: 1.51,
    vanFuelExpense: 0,
    labor: 0,
    vanTotal: 0,
    rentalDays: 0,
    rentalWeeklyRate: 0,
    rentalDailyRate: 0,
    rental26Fees: 0,
    diesel: 1.43,
    truck26Fuel: 0,
    truck26Total: 0,
    truck16Fuel: 0,
    truck16Total: 0,
    rental16Fees: 0,
    truck16Fuel: 0,
    truck16Total: 0
};
const mealCost = (totalMiles, drivers, mealPrice) => {
    return ((Math.round(totalMiles / 300)) * mealPrice) * drivers;
    
}
function mileReducer(state, action, initialState) {
    switch (action.type) {
        case 'totalMilesUpdate': {
            return {...state, 
                    totalMiles: parseInt(action.payload),
                    hours: Math.round(action.payload / 75),
                    meals: Math.round(action.payload / 300),
                    mealCost: mealCost(action.payload, state.drivers, KEY_NUMBERS.AVG_MEAL_PRICE),
                    drivingDays: Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT),
                    hotelNights: Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1,
                    hotelTotalCost: KEY_NUMBERS.HOTEL_COST * (Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1),
                    vanFuelExpense: (action.payload / KEY_NUMBERS.VAN_MPG) * state.gas,
                    labor: ((KEY_NUMBERS.HOURLY_FEE * (Math.round(action.payload / 75))) * state.drivers),
                    vanTotal: ((KEY_NUMBERS.HOURLY_FEE * (Math.round(action.payload / 75))) * state.drivers) + 
                                ((action.payload / KEY_NUMBERS.VAN_MPG) * state.gas)
                                 + (KEY_NUMBERS.HOTEL_COST * (Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1)) + 
                                 (((Math.round(action.payload / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * state.drivers),
                    rentalDays: (Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay,
                    rentalWeeklyRate: Math.floor(((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7),
                    rentalDailyRate: ((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7,
                    rental26Fees: (KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * (((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor(((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7))) +  
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)) + 
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (action.payload + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)),
                    truck26Fuel: ((action.payload / KEY_NUMBERS.TRUCK_26_MPG) * state.diesel),
                    truck26Total: ((KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * (((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor(((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7))) +  
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)) + 
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (action.payload + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) + (((Math.round(action.payload / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * state.drivers)
                        + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(action.payload / 75))) * state.drivers))
                        + (((action.payload / KEY_NUMBERS.TRUCK_26_MPG) * state.diesel)) +
                         (KEY_NUMBERS.HOTEL_COST * (Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1)),
                    rental16Fees: (KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * (((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7)) +
                         (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7))) +  
                         (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)) + 
                         (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (action.payload + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)),
                    truck16Fuel: ((action.payload / KEY_NUMBERS.TRUCK_16_MPG) * state.diesel),
                    truck16Total: ((KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * (((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7)) +
                         (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7))) +  
                         (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)) + 
                         (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (action.payload + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) + (((Math.round(action.payload / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * state.drivers)
                         + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(action.payload / 75))) * state.drivers))
                         + (((action.payload / KEY_NUMBERS.TRUCK_16_MPG) * state.diesel)) +
                          (KEY_NUMBERS.HOTEL_COST * (Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1))
                }
        }
        case 'driversUpdate': {
            return {...state, 
                    drivers: parseInt(action.payload),
                    mealCost: (state.meals * KEY_NUMBERS.AVG_MEAL_PRICE) * parseInt(action.payload),
                    labor: (KEY_NUMBERS.HOURLY_FEE * state.hours) * parseInt(action.payload),
                    vanTotal: ((KEY_NUMBERS.HOURLY_FEE * (Math.round(parseInt(action.payload) / 75))) * parseInt(action.payload)) + 
                                ((state.totalMiles / KEY_NUMBERS.VAN_MPG) * state.gas)
                                 + (KEY_NUMBERS.HOTEL_COST * (Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1)) + 
                                 (((Math.round(parseInt(action.payload) / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * parseInt(action.payload)),
                    truck26Total: ((KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * (((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)/7))) +  
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)) + 
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) + 
                        (((Math.round(state.totalMiles / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * parseInt(action.payload))
                        + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(state.totalMiles / 75))) * parseInt(action.payload)))
                        + (((parseInt(action.payload) / KEY_NUMBERS.TRUCK_26_MPG) * state.diesel)) +
                        (KEY_NUMBERS.HOTEL_COST * (Math.ceil(state.totalMiles/ KEY_NUMBERS.DAILY_MILE_LIMIT) - 1)),
                    truck16Total: ((KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * (((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + parseInt(action.payload))%7)) +
                        (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + parseInt(action.payload))/7))) +  
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + parseInt(action.payload))) + 
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) + 
                        (((Math.round(state.totalMiles / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * parseInt(action.payload))
                        + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(state.totalMiles / 75))) * parseInt(action.payload)))
                        + (((parseInt(action.payload) / KEY_NUMBERS.TRUCK_16_MPG) * state.diesel)) +
                        (KEY_NUMBERS.HOTEL_COST * (Math.ceil(state.totalMiles/ KEY_NUMBERS.DAILY_MILE_LIMIT) - 1))
                }
        }
        case 'locationOneChange': {
            return {...state, locationOne: action.payload}
        }
        case 'locationTwoChange': {
            return {...state, locationTwo: action.payload}
        }
        case "rentalPaddingDayChange": {
            return {...state,
                     rentalPaddingDay: parseInt(action.payload),
                     rentalDays: (Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload,
                     rentalWeeklyRate: Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)/7),
                     rentalDailyRate: ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)%7,
                     rental26Fees: (KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * (((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)/7))) +  
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)) + 
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)),
                    truck26Total: ((KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * (((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)/7))) +  
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)) + 
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) + 
                        (((Math.round(state.totalMiles / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * state.drivers)
                        + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(state.totalMiles / 75))) * state.drivers))
                        + (((action.payload / KEY_NUMBERS.TRUCK_26_MPG) * state.diesel)) +
                        (KEY_NUMBERS.HOTEL_COST * (Math.ceil(state.totalMiles/ KEY_NUMBERS.DAILY_MILE_LIMIT) - 1)),
                    rental16Fees: (KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * (((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)/7))) +  
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)) + 
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)),
                    truck16Total: ((KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * (((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)/7))) +  
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)) + 
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) + 
                        (((Math.round(state.totalMiles / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * state.drivers)
                        + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(state.totalMiles / 75))) * state.drivers))
                        + (((action.payload / KEY_NUMBERS.TRUCK_16_MPG) * state.diesel)) +
                        (KEY_NUMBERS.HOTEL_COST * (Math.ceil(state.totalMiles/ KEY_NUMBERS.DAILY_MILE_LIMIT) - 1))
                    }
        }
        case "gasOverride":{
            return {...state,
                    gas: parseInt(action.payload),
                    vanFuelExpense: (state.totalMiles / KEY_NUMBERS.VAN_MPG) * parseInt(action.payload),
                    vanTotal: ((KEY_NUMBERS.HOURLY_FEE * (Math.round(parseInt(state.drivers) / 75))) * parseInt(state.drivers)) + 
                                ((state.totalMiles / KEY_NUMBERS.VAN_MPG) * action.payload)
                                 + (KEY_NUMBERS.HOTEL_COST * (Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1)) + 
                                 (((Math.round(parseInt(state.drivers) / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * parseInt(state.drivers))
        }}
        case "dieselOverride":{
            return {...state,
                    diesel: parseInt(action.payload),
                    truck26Fuel: ((state.totalMiles / KEY_NUMBERS.TRUCK_26_MPG) * parseInt(action.payload)),
                    truck26Total: ((KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * (((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7))) +  
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)) + 
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) + (((Math.round(state.totalMiles / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * state.drivers)
                        + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(state.totalMiles / 75))) * state.drivers))
                        + (((state.totalMiles / KEY_NUMBERS.TRUCK_26_MPG) * parseInt(action.payload))) +
                         (KEY_NUMBERS.HOTEL_COST * (Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1)),
                    truck16Fuel: ((state.totalMiles / KEY_NUMBERS.TRUCK_16_MPG) * parseInt(action.payload)),
                    truck16Total: ((KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * (((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7))) +  
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)) + 
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) + (((Math.round(state.totalMiles / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * state.drivers)
                        + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(state.totalMiles / 75))) * state.drivers))
                        + (((state.totalMiles / KEY_NUMBERS.TRUCK_16_MPG) * parseInt(action.payload))) +
                        (KEY_NUMBERS.HOTEL_COST * (Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1))

        }}
        case "drivingDaysUpdate":{
            return{...state,
                drivingDays: parseInt(action.payload),
                hotelNights: action.payload - 1,
                hotelTotalCost: KEY_NUMBERS.HOTEL_COST * (parseInt(action.payload) - 1),
                labor: (KEY_NUMBERS.HOURLY_FEE * (8 * parseInt(action.payload)) * state.drivers),
                vanTotal: ((KEY_NUMBERS.HOURLY_FEE * (8 * parseInt(action.payload)) * state.drivers) * state.drivers) + 
                                ((state.totalMiles / KEY_NUMBERS.VAN_MPG) * state.gas)
                                 + (KEY_NUMBERS.HOTEL_COST * (parseInt(action.payload) - 1)) + 
                                 ((Math.round(action.payload / 2) * state.drivers)) * KEY_NUMBERS.AVG_MEAL_PRICE,
                                 rentalDays: (Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay,
                rentalWeeklyRate: (parseInt(action.payload) + state.rentalPaddingDay)/7,
                rentalDailyRate: (parseInt(action.payload) + state.rentalPaddingDay)%7,
                rental26Fees: (KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * ((parseInt(action.payload)+ state.rentalPaddingDay)%7)) +
                    (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor(parseInt(action.payload) + state.rentalPaddingDay)/7)) +  
                    (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((parseInt(action.payload)) + state.rentalPaddingDay)) + 
                    (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)),
                truck26Fuel: ((state.totalMiles / KEY_NUMBERS.TRUCK_26_MPG) * state.diesel),
                truck26Total: ((KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * ((parseInt(action.payload)+ state.rentalPaddingDay)%7)) +
                    (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor((parseInt(action.payload) + state.rentalPaddingDay)/7))) +  
                    (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * (parseInt(action.payload) + state.rentalPaddingDay)) + 
                    (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) 
                    + ((Math.round(action.payload / 2) * state.drivers)) * KEY_NUMBERS.AVG_MEAL_PRICE
                    + (KEY_NUMBERS.HOURLY_FEE * (8 * parseInt(action.payload)) * state.drivers)
                    + (((state.totalMiles / KEY_NUMBERS.TRUCK_26_MPG) * state.diesel)) +
                    KEY_NUMBERS.HOTEL_COST * (parseInt(action.payload) - 1),
                rental16Fees: (KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * ((parseInt(action.payload)+ state.rentalPaddingDay)%7)) +
                    (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(parseInt(action.payload) + state.rentalPaddingDay)/7)) +  
                    (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((parseInt(action.payload)) + state.rentalPaddingDay)) + 
                    (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)),
                truck16Fuel: ((state.totalMiles / KEY_NUMBERS.TRUCK_16_MPG) * state.diesel),
                truck16Total: ((KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * ((parseInt(action.payload)+ state.rentalPaddingDay)%7)) +
                    (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor((parseInt(action.payload) + state.rentalPaddingDay)/7))) +  
                    (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * (parseInt(action.payload) + state.rentalPaddingDay)) + 
                    (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) 
                    + ((Math.round(action.payload / 2) * state.drivers)) * KEY_NUMBERS.AVG_MEAL_PRICE
                    + (KEY_NUMBERS.HOURLY_FEE * (8 * parseInt(action.payload)) * state.drivers)
                    + (((state.totalMiles / KEY_NUMBERS.TRUCK_16_MPG) * state.diesel)) +
                    KEY_NUMBERS.HOTEL_COST * (parseInt(action.payload) - 1),
                meals: Math.round(action.payload / 2),
                mealCost: ((Math.round(action.payload / 2) * state.drivers)) * KEY_NUMBERS.AVG_MEAL_PRICE
            }
        }
        case "setTotalMiles":{
            return {...state,
                totalMiles: action.payload
            }}
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
          }
    }
}

function MileProvider({children}) {
    const [state, dispatch] = useReducer(mileReducer, initialState)

    return (
        <MileStateContext.Provider value = {state}>
            <MileDispatchContext.Provider value={dispatch}>
                {children}
            </MileDispatchContext.Provider>     
       </MileStateContext.Provider>
    )
}



function useMileState() {
    const context = React.useContext(MileStateContext)
    if (context === undefined) {
      throw new Error('useCountState must be used within a CountProvider')
    }
    return context
  }
  function useMileDispatch() {
    const context = React.useContext(MileDispatchContext)
    if (context === undefined) {
      throw new Error('useCountDispatch must be used within a CountProvider')
    }
    return context
  }

  export {MileProvider, useMileState, useMileDispatch}