import React,{useReducer, createContext} from 'react';
import {KEY_NUMBERS} from "../keyValues";

const MileStateContext = createContext();
const MileDispatchContext = createContext();

const initialState = {
    totalMiles: 0,
    drivers: 1,
    locationOne: "-97.4111604,35.4653761",
    locationTwo: "-96.196788,41.2009873",
    rentalPaddingDay: 1,
    hours: 0,
    meals: 0,
    mealCost: 0,
    drivingDays: 0,
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
    searchResults: "",
    count: 0
};
const mealCost = (totalMiles, drivers) => {
    return ((Math.round(totalMiles / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * drivers;
}

const hoursBasedOnMiles = (totalMiles) => {
    return Math.round(totalMiles/75);
}

const mealsBasedOnMiles = (totalMiles) => {
    return Math.round(totalMiles / 300);
    // the assumption here is that every 300 miles we will stop for a meal. This value was determined by considering the okc metro run (to prevent meals on that trip)
    // and how many miles are in a day of driving which we agreed on limiting to 600 miles a day.
}
const drivingDaysByMiles = (totalMiles) => {
    return Math.ceil(totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)
}

const hotelTotalCostByMiles = (totalMiles) => {
    return KEY_NUMBERS.HOTEL_COST * (Math.ceil(totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1)
}

const vanFuelExpenseByMiles = (totalMiles, gasPrice) => {
    return (totalMiles / KEY_NUMBERS.VAN_MPG) * parseFloat(gasPrice);
}

const labor = (totalMiles, drivers) => {
    return ((KEY_NUMBERS.HOURLY_FEE * totalMiles )) * drivers;

}

const vanTotal = (labor, gas, hotel, meals) => {
return labor + gas + hotel + meals;
}

const rental26Fees = (totalMiles, rentalPaddingDay, drivingDays) => {
    return parseInt((KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * (drivingDays + rentalPaddingDay%7)) +
            (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (drivingDays + rentalPaddingDay)/7) +
            (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * (drivingDays + rentalPaddingDay)) +
            (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)));
}

const truck26Fuel = (totalMiles, diesel) => {
    return parseInt((totalMiles / KEY_NUMBERS.TRUCK_26_MPG) * parseFloat(diesel))
}


const truck26Total = (rentalFees, meals, labor, diesel, hotel ) => {
    console.log("fees" + rentalFees);
    console.log("meals" + meals);
    console.log("labor" + labor);
    console.log("diesel" + diesel);
    console.log("hotel" + hotel);
    return parseInt(rentalFees) + parseInt(meals) + parseInt(labor) + parseInt(diesel) + parseInt(hotel);
}

const truck16Total = (rentalFees, meals, labor, diesel, hotel ) => {
    return rentalFees + meals + labor + diesel + hotel;
}

function mileReducer(state, action) {
    switch (action.type) {
        case 'totalMilesUpdate': {
            return {...state,
                    totalMiles: parseInt(action.payload),
                    hours: hoursBasedOnMiles(action.payload),
                    meals: mealsBasedOnMiles(action.payload),
                    mealCost: mealCost(action.payload, state.drivers),
                    drivingDays: drivingDaysByMiles(action.payload),
                    hotelTotalCost: hotelTotalCostByMiles(action.payload),
                    vanFuelExpense: vanFuelExpenseByMiles(action.payload, state.gas),
                    labor: labor(Math.round(action.payload / 75), state.drivers),
                    // 75 is the value agreed upon that constitutes an ~hour
                    rentalWeeklyRate: Math.floor(((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7),
                    rentalDailyRate: ((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7,
                    rental26Fees: rental26Fees(action.payload, state.rentalPaddingDay, state.drivingDays),
                    truck26Fuel: truck26Fuel(action.payload, state.diesel),
                    rental16Fees: (KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * (((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7)) +
                         (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7))) +
                         (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)) +
                         (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (action.payload + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)),
                    truck16Fuel: ((action.payload / KEY_NUMBERS.TRUCK_16_MPG) * parseFloat(state.diesel)),
                }
        }
        case 'driversUpdate': {
            return {...state,
                    drivers: parseInt(action.payload),
                    // mealsCost = (amount of estimated meals * avg meal price (10)) * drivers
                    mealCost: (state.meals * KEY_NUMBERS.AVG_MEAL_PRICE) * parseInt(action.payload),
                    // labor = (hourly rate * estimated hours) * drivers
                    labor: (KEY_NUMBERS.HOURLY_FEE * state.hours) * parseInt(action.payload),
                    // vanTotal = labor + gas + hotel + meals
                }
        }
        case 'locationOneChange': {
            return {...state, locationOne: action.payload}
        }
        case 'locationTwoChange': {
            return {...state, locationTwo: action.payload}
        }
        case 'searchResultsChange': {
            return {...state, searchResults: action.payload}
        }
        case 'countClick': {
            return {...state, count: action.payload}
        }
        case "rentalPaddingDayChange": {
            return {...state,
                     rentalPaddingDay: parseInt(action.payload),
                     rentalDays: (Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload,
                     rentalWeeklyRate: Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)/7),
                     rentalDailyRate: ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)%7,
                     rental26Fees: rental26Fees(state.totalMiles, action.payload, state.drivingDays),
                    rental16Fees: (KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * (((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)/7))) +
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)) +
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)),
                    }
        }
        case "gasOverride":{
            return {...state,
                    gas: parseFloat(action.payload),
                    // vanFuelExpense = (totalMiles/ mpg of the van) * (gas value in cents)
                    vanFuelExpense: (state.totalMiles / KEY_NUMBERS.VAN_MPG) * parseFloat(action.payload),
                    // vanTotal = labor + gas + hotel + meals
        }}
        case "dieselOverride":{
            return {...state,
                    diesel: parseFloat(action.payload),
                    truck26Fuel: truck26Fuel(state.totalMiles, action.payload),
                    truck16Fuel: ((state.totalMiles / KEY_NUMBERS.TRUCK_16_MPG) * parseFloat(action.payload)),

        }}
        case "drivingDaysUpdate":{
            return{...state,
                drivingDays: parseInt(action.payload),
                hotelTotalCost: KEY_NUMBERS.HOTEL_COST * (parseInt(action.payload) - 1),
                labor: (KEY_NUMBERS.HOURLY_FEE * (8 * parseInt(action.payload)) * state.drivers),
                // vanTotal = labor + gas + hotel + meals
                rentalDays: (Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay,
                rentalWeeklyRate: (parseInt(action.payload) + state.rentalPaddingDay)/7,
                rentalDailyRate: (parseInt(action.payload) + state.rentalPaddingDay)%7,
                rental26Fees: rental26Fees(state.totalMiles, state.rentalPaddingDay, action.payload),
                rental16Fees: (KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * ((parseInt(action.payload)+ state.rentalPaddingDay)%7)) +
                    (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(parseInt(action.payload) + state.rentalPaddingDay)/7)) +
                    (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((parseInt(action.payload)) + state.rentalPaddingDay)) +
                    (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)),
                meals: Math.round(action.payload / 2),
                mealCost: mealCost(state.totalMiles, action.payload, KEY_NUMBERS.AVG_MEAL_PRICE)
            }
        }
        case "calculateTotals":{
            return {...state,
                vanTotal: vanTotal(state.labor, state.gas, state.hotelTotalCost, state.mealCost),
                truck26Total: truck26Total(parseInt(state.rental26Fees),  parseInt(state.mealCost), parseInt(state.labor), parseInt(state.truck26Fuel), parseInt(state.hotelTotalCost)),
                truck16Total: truck16Total(state.rental16Fees, state.mealCost, state.labor, state.truck16Fuel, state.hotelTotalCost)
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