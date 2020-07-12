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
const mealCost = (totalMiles, drivers) => {
    return ((Math.round(totalMiles / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * drivers;
}
const vanTotal = (labor, gas, hotel, meals) => {
    return labor + gas + hotel + meals;
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

const hotelNightsByMiles = (totalMiles) => {
    return Math.ceil(totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1;
    //  the logic is that we will assume that the last day of a trip will be spent on the road and ending at home hence the -1
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



function mileReducer(state, action, initialState) {
    switch (action.type) {
        case 'totalMilesUpdate': {
            return {...state,
                    totalMiles: parseInt(action.payload),
                    hours: hoursBasedOnMiles(action.payload),
                    meals: mealsBasedOnMiles(action.payload),
                    mealCost: mealCost(action.payload, state.drivers),
                    drivingDays: drivingDaysByMiles(action.payload),
                    hotelNights: hotelNightsByMiles(action.payload),
                    hotelTotalCost: hotelTotalCostByMiles(action.payload),
                    vanFuelExpense: vanFuelExpenseByMiles(action.payload, state.gas),
                    labor: labor(Math.round(action.payload / 75), state.drivers),
                    // 75 is the value agreed upon that constitutes an ~hour
                    vanTotal: vanTotal(((KEY_NUMBERS.HOURLY_FEE * (Math.round(action.payload / 75))) * state.drivers),
                                        ((action.payload / KEY_NUMBERS.VAN_MPG) * parseFloat(state.gas)),
                                        (KEY_NUMBERS.HOTEL_COST * (Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1)),
                                        (((Math.round(action.payload / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * state.drivers)),
                    rentalWeeklyRate: Math.floor(((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7),
                    rentalDailyRate: ((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7,
                    rental26Fees: (KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * (((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor(((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7))) +
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)) +
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (action.payload + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)),
                    truck26Fuel: ((action.payload / KEY_NUMBERS.TRUCK_26_MPG) * parseFloat(state.diesel)),
                    truck26Total: ((KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * (((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor(((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7))) +
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)) +
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (action.payload + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) + (((Math.round(action.payload / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * state.drivers)
                        + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(action.payload / 75))) * state.drivers))
                        + (((action.payload / KEY_NUMBERS.TRUCK_26_MPG) * parseFloat(state.diesel))) +
                         (KEY_NUMBERS.HOTEL_COST * (Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1)),
                    rental16Fees: (KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * (((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7)) +
                         (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7))) +
                         (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)) +
                         (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (action.payload + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)),
                    truck16Fuel: ((action.payload / KEY_NUMBERS.TRUCK_16_MPG) * parseFloat(state.diesel)),
                    truck16Total: ((KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * (((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7)) +
                         (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7))) +
                         (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)) +
                         (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (action.payload + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) + (((Math.round(action.payload / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * state.drivers)
                         + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(action.payload / 75))) * state.drivers))
                         + (((action.payload / KEY_NUMBERS.TRUCK_16_MPG) * parseFloat(state.diesel))) +
                          (KEY_NUMBERS.HOTEL_COST * (Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1))
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
                    vanTotal: vanTotal((KEY_NUMBERS.HOURLY_FEE * state.hours) * parseInt(action.payload) , ((state.totalMiles / KEY_NUMBERS.VAN_MPG) * parseFloat(state.gas)), state.hotelTotalCost, (state.meals * KEY_NUMBERS.AVG_MEAL_PRICE) * parseInt(action.payload)),
                    truck26Total: ((KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * (((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)/7))) +
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + action.payload)) +
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) +
                        (((Math.round(state.totalMiles / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * parseInt(action.payload))
                        + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(state.totalMiles / 75))) * parseInt(action.payload)))
                        + (((parseInt(action.payload) / KEY_NUMBERS.TRUCK_26_MPG) * parseFloat(state.diesel))) +
                        (KEY_NUMBERS.HOTEL_COST * (Math.ceil(state.totalMiles/ KEY_NUMBERS.DAILY_MILE_LIMIT) - 1)),
                    truck16Total: ((KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * (((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + parseInt(action.payload))%7)) +
                        (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + parseInt(action.payload))/7))) +
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + parseInt(action.payload))) +
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) +
                        (((Math.round(state.totalMiles / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * parseInt(action.payload))
                        + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(state.totalMiles / 75))) * parseInt(action.payload)))
                        + (((parseInt(action.payload) / KEY_NUMBERS.TRUCK_16_MPG) * parseFloat(state.diesel))) +
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
                        + (((action.payload / KEY_NUMBERS.TRUCK_26_MPG) * parseFloat(state.diesel))) +
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
                        + (((action.payload / KEY_NUMBERS.TRUCK_16_MPG) * parseFloat(state.diesel))) +
                        (KEY_NUMBERS.HOTEL_COST * (Math.ceil(state.totalMiles/ KEY_NUMBERS.DAILY_MILE_LIMIT) - 1))
                    }
        }
        case "gasOverride":{
            return {...state,
                    gas: parseFloat(action.payload),
                    // vanFuelExpense = (totalMiles/ mpg of the van) * (gas value in cents)
                    vanFuelExpense: (state.totalMiles / KEY_NUMBERS.VAN_MPG) * parseFloat(action.payload),
                    // vanTotal = labor + gas + hotel + meals
                    vanTotal: vanTotal(state.labor, ((state.totalMiles / KEY_NUMBERS.VAN_MPG) * parseFloat(action.payload)), state.hotelTotalCost, state.mealCost)
        }}
        case "dieselOverride":{
            return {...state,
                    diesel: parseFloat(action.payload),
                    truck26Fuel: ((state.totalMiles / KEY_NUMBERS.TRUCK_26_MPG) * parseFloat(action.payload)),
                    truck26Total: ((KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * (((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7))) +
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)) +
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) + (((Math.round(state.totalMiles / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * state.drivers)
                        + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(state.totalMiles / 75))) * state.drivers))
                        + (((state.totalMiles / KEY_NUMBERS.TRUCK_26_MPG) * parseFloat(action.payload))) +
                         (KEY_NUMBERS.HOTEL_COST * (Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1)),
                    truck16Fuel: ((state.totalMiles / KEY_NUMBERS.TRUCK_16_MPG) * parseFloat(action.payload)),
                    truck16Total: ((KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * (((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)%7)) +
                        (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)/7))) +
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay)) +
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))) + (((Math.round(state.totalMiles / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * state.drivers)
                        + (((KEY_NUMBERS.HOURLY_FEE * (Math.round(state.totalMiles / 75))) * state.drivers))
                        + (((state.totalMiles / KEY_NUMBERS.TRUCK_16_MPG) * parseFloat(action.payload))) +
                        (KEY_NUMBERS.HOTEL_COST * (Math.ceil(state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1))

        }}
        case "drivingDaysUpdate":{
            return{...state,
                drivingDays: parseInt(action.payload),
                hotelNights: action.payload - 1,
                hotelTotalCost: KEY_NUMBERS.HOTEL_COST * (parseInt(action.payload) - 1),
                labor: (KEY_NUMBERS.HOURLY_FEE * (8 * parseInt(action.payload)) * state.drivers),
                // vanTotal = labor + gas + hotel + meals
                vanTotal: vanTotal(((KEY_NUMBERS.HOURLY_FEE * (8 * parseInt(action.payload)) * state.drivers),
                                    ((state.totalMiles / KEY_NUMBERS.VAN_MPG) * parseFloat(state.gas)),
                                    (KEY_NUMBERS.HOTEL_COST * (parseInt(action.payload) - 1)), state.mealCost)),
                rentalDays: (Math.ceil(action.payload / KEY_NUMBERS.DAILY_MILE_LIMIT)) + state.rentalPaddingDay,
                rentalWeeklyRate: (parseInt(action.payload) + state.rentalPaddingDay)/7,
                rentalDailyRate: (parseInt(action.payload) + state.rentalPaddingDay)%7,
                rental26Fees: (KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * ((parseInt(action.payload)+ state.rentalPaddingDay)%7)) +
                    (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor(parseInt(action.payload) + state.rentalPaddingDay)/7)) +
                    (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((parseInt(action.payload)) + state.rentalPaddingDay)) +
                    (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)),
                truck26Fuel: ((state.totalMiles / KEY_NUMBERS.TRUCK_26_MPG) * parseFloat(state.diesel)),
                truck26Total: ((KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * ((parseInt(action.payload)+ state.rentalPaddingDay)%7)) +
                    (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * (Math.floor((parseInt(action.payload) + state.rentalPaddingDay)/7))) +
                    (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * (parseInt(action.payload) + state.rentalPaddingDay)) +
                    (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)))
                    + ((Math.round(action.payload / 2) * state.drivers)) * KEY_NUMBERS.AVG_MEAL_PRICE
                    + (KEY_NUMBERS.HOURLY_FEE * (8 * parseInt(action.payload)) * state.drivers)
                    + (((state.totalMiles / KEY_NUMBERS.TRUCK_26_MPG) * parseFloat(state.diesel))) +
                    KEY_NUMBERS.HOTEL_COST * (parseInt(action.payload) - 1),
                rental16Fees: (KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * ((parseInt(action.payload)+ state.rentalPaddingDay)%7)) +
                    (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor(parseInt(action.payload) + state.rentalPaddingDay)/7)) +
                    (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * ((parseInt(action.payload)) + state.rentalPaddingDay)) +
                    (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)),
                truck16Fuel: ((state.totalMiles / KEY_NUMBERS.TRUCK_16_MPG) * parseFloat(state.diesel)),
                truck16Total: ((KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * ((parseInt(action.payload)+ state.rentalPaddingDay)%7)) +
                    (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * (Math.floor((parseInt(action.payload) + state.rentalPaddingDay)/7))) +
                    (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * (parseInt(action.payload) + state.rentalPaddingDay)) +
                    (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE)))
                    + ((Math.round(action.payload / 2) * state.drivers)) * KEY_NUMBERS.AVG_MEAL_PRICE
                    + (KEY_NUMBERS.HOURLY_FEE * (8 * parseInt(action.payload)) * state.drivers)
                    + (((state.totalMiles / KEY_NUMBERS.TRUCK_16_MPG) * parseFloat(state.diesel))) +
                    KEY_NUMBERS.HOTEL_COST * (parseInt(action.payload) - 1),
                meals: Math.round(action.payload / 2),
                mealCost: mealCost(state.totalMiles, action.payload, KEY_NUMBERS.AVG_MEAL_PRICE)
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