import React,{useState, createContext} from 'react';

export const MileContext = createContext();

export const MileProvider = props => {
    const [totalMiles, setTotalMiles] = useState(0);
    const [drivers, setDrivers] = useState(1);
    const [rentalPaddingDay, setRentalPaddingDay] = useState(1);
    const [hotelCost, setHotelCost] = useState(0);
    const [hotelDays, setHotelDays] = useState(0);
    const [hotelTotal, setHotelTotal] = useState(0);
    const [drivingDays, setDrivingDays] = useState(0);
    const [hotelNights, setHotelNights] = useState(0);
    const [hours, setHours] = useState(0);
    const [meals, setMeals] = useState(0);
    const [laborCost, setLaborCost] = useState(0);
    const [truck26Total, setTruck26Total] = useState(0);
    const [truck16Total, setTruck16Total] = useState(0);
    const [vanTotal, setVanTotal] = useState(0);
    const [mealCost, setMealCost] = useState(0);
    const [vanFuelCost, setVanFuelCost] = useState(0);
    const [rental26Cost, setRental26Cost] = useState(0);
    const [rental16Cost, setRental16Cost] = useState(0);
    const [truck26Fuel, setTruck26Fuel] = useState(0);
    const [truck16Fuel, setTruck16Fuel] = useState(0);
    const [trip, setTrip] = useState("Custom");
    const [locationOne, setLocationOne] = useState("-97.4111604,35.4653761");
    const [locationTwo, setLocationTwo] = useState("-73.778716,42.740913");
    const [gas, setGas] = useState(2.465);
    const [diesel, setDiesel] = useState(2.91);

    return (
        <MileContext.Provider 
        value = {{
            totalMiles, 
            setTotalMiles, 
            drivers, 
            setDrivers,
            rentalPaddingDay,
            setRentalPaddingDay,
            hotelCost,
            setHotelCost,
            hotelDays,
            setHotelDays,
            hotelTotal,
            setHotelTotal,
            drivingDays,
            setDrivingDays,
            drivers,
            setDrivers,
            hotelNights,
            setHotelNights,
            hours,
            setHours,
            meals,
            setMeals,
            laborCost,
            setLaborCost,
            truck26Total,
            setTruck26Total,
            truck16Total,
            setTruck16Total,
            vanTotal,
            setVanTotal,
            mealCost,
            setMealCost,
            vanFuelCost,
            setVanFuelCost,
            rental26Cost,
            setRental26Cost,
            rental16Cost,
            setRental16Cost,
            truck26Fuel,
            setTruck26Fuel,
            truck16Fuel,
            setTruck16Fuel,
            trip,
            setTrip,
            locationOne,
            setLocationOne,
            locationTwo,
            setLocationTwo,
            gas,
            setGas,
            diesel,
            setDiesel
        }}>
            {props.children}    
        </MileContext.Provider>
    )
}