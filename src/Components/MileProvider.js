import React,{ useState, createContext } from 'react';

export const MileContext = createContext();
export const MileConsumer = MileContext.Consumer;
const MileProvider = props => {
        const [totalMiles, setTotalMiles] = useState(0);
    
            state = {
                totalMiles: 0,
                hotelCost: 0,
                hotelDays:  0,
                hotelTotal: 0,
                drivingDays: 0,
                drivers: 1,
                hotelNights: 0,
                hours: 0,
                meals: 0,
                laborCost: 0,
                truck26Total: 0,
                truck16Total: 0,
                vanTotal: 0,
                mealCost: 0,
                vanFuelCost: 0,
                rental26Cost: 0,
                rental16Cost: 0,
                truck26Fuel: 0,
                truck16Fuel: 0,
                rentalPaddingDay: 1,
                trip: "Custom",
                locationOne: '-97.4111604,35.4653761',
                locationTwo: '-73.778716,42.740913',
                gas: 2.465,
                diesel: 2.91
            };
        



    return(
        <MileContext.Provider value={totalMiles, setTotalMiles}>
            {props.children}
        </MileContext.Provider>
    );
}




export default MileProvider;




