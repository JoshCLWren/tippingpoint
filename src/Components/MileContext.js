import React,{useReducer, createContext} from 'react';
import {KEY_NUMBERS} from "./keyValues";

const MileStateContext = createContext();
const MileDispatchContext = createContext();

function calculateHours(totalMiles){
    Math.round(totalMiles / 75)
}
function mileReducer(state, action) {
    switch (action.type) {
        case 'totalMilesUpdate': {
            return {...state, 
                    totalMiles: action.payload, 
                    hours: Math.round(action.payload / 75),
                    howManyMeals: Math.round(action.payload / 300)
                }
        }
        case 'driversUpdate': {
            return {...state, drivers: action.payload}
        }
        case 'locationOneChange': {
            return {...state, locationOne: action.payload}
        }
        case 'locationTwoChange': {
            return {...state, locationTwo: action.payload}
        }
        case "rentalPaddingDayChange": {
            return {...state, rentalPaddingDay: action.payload}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
          }
    }
}

function MileProvider({children}) {
    const [state, dispatch] = useReducer(mileReducer, 
        {
            totalMiles: 0, 
            drivers: 1, 
            locationOne: "-97.4111604,35.4653761", 
            locationTwo: "-97.4111604,35.4653761",
            rentalPaddingDay: 1,
            hours: 0,
            meals: 0,
            mealCost: 0

        })

    // const [drivers, Drivers] = useState(1);
    // const [rentalPaddingDay, RentalPaddingDay] = useState(1);
    // const [hotelCost, HotelCost] = useState(0);
    // const [hotelDays, HotelDays] = useState(0);
    // const [hotelTotal, HotelTotal] = useState(0);
    // const [drivingDays, DrivingDays] = useState(0);
    // const [hotelNights, HotelNights] = useState(0);
    // const [hours, Hours] = useState(0);
    // const [meals, Meals] = useState(0);
    // const [laborCost, LaborCost] = useState(0);
    // const [truck26Total, Truck26Total] = useState(0);
    // const [truck16Total, Truck16Total] = useState(0);
    // const [vanTotal, VanTotal] = useState(0);
    // const [mealCost, MealCost] = useState(0);
    // const [vanFuelCost, VanFuelCost] = useState(0);
    // const [rental26Cost, Rental26Cost] = useState(0);
    // const [rental16Cost, Rental16Cost] = useState(0);
    // const [truck26Fuel, Truck26Fuel] = useState(0);
    // const [truck16Fuel, Truck16Fuel] = useState(0);
    // const [trip, Trip] = useState("Custom");
    // const [locationOne, LocationOne] = useState("-97.4111604,35.4653761");
    // const [locationTwo, LocationTwo] = useState("-73.778716,42.740913");
    // const [gas, Gas] = useState(2.465);
    // const [diesel, Diesel] = useState(2.91);

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