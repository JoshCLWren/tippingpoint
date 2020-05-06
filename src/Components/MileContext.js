import React,{useReducer, createContext} from 'react';

const MileStateContext = createContext();
const MileDispatchContext = createContext();

function mileReducer(state, action) {
    switch (action.type) {
        case 'totalMilesUpdate': {
            return {...state, totalMiles: action.payload}
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
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
          }
    }
}

function MileProvider({children}) {
    const [state, dispatch] = useReducer(mileReducer, {totalMiles: 0, drivers: 1, locationOne: "-97.4111604,35.4653761", locationTwo: "-73.778716,42.740913"})

    // const [drivers, setDrivers] = useState(1);
    // const [rentalPaddingDay, setRentalPaddingDay] = useState(1);
    // const [hotelCost, setHotelCost] = useState(0);
    // const [hotelDays, setHotelDays] = useState(0);
    // const [hotelTotal, setHotelTotal] = useState(0);
    // const [drivingDays, setDrivingDays] = useState(0);
    // const [hotelNights, setHotelNights] = useState(0);
    // const [hours, setHours] = useState(0);
    // const [meals, setMeals] = useState(0);
    // const [laborCost, setLaborCost] = useState(0);
    // const [truck26Total, setTruck26Total] = useState(0);
    // const [truck16Total, setTruck16Total] = useState(0);
    // const [vanTotal, setVanTotal] = useState(0);
    // const [mealCost, setMealCost] = useState(0);
    // const [vanFuelCost, setVanFuelCost] = useState(0);
    // const [rental26Cost, setRental26Cost] = useState(0);
    // const [rental16Cost, setRental16Cost] = useState(0);
    // const [truck26Fuel, setTruck26Fuel] = useState(0);
    // const [truck16Fuel, setTruck16Fuel] = useState(0);
    // const [trip, setTrip] = useState("Custom");
    // const [locationOne, setLocationOne] = useState("-97.4111604,35.4653761");
    // const [locationTwo, setLocationTwo] = useState("-73.778716,42.740913");
    // const [gas, setGas] = useState(2.465);
    // const [diesel, setDiesel] = useState(2.91);

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