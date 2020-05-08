import React,{useContext} from "react";
import "./main.css";
import {KEY_NUMBERS} from "./keyValues";
import {PRESETS} from "./presets";
import {MileContext, useMileState, useMileDispatch} from "./MileContext";

    

export function useCalculateTotals(){
    const {totalMiles, drivers, rentalPaddingDay} = useMileState()

        const {hotelCost, setHotelCost} = useContext(MileContext);
        const {hotelDays, setHotelDays} = useContext(MileContext);
        const {hotelTotal, setHotelTotal} = useContext(MileContext);
        const {drivingDays, setDrivingDays} = useContext(MileContext);
        const {hours, setHours} = useContext(MileContext);
        const {meals, setMeals} = useContext(MileContext);
        const {laborCost, setLaborCost} = useContext(MileContext);
        const {truck26Total, setTruck26Total} = useContext(MileContext);
        const {truck16Total, setTruck16Total} = useContext(MileContext);
        const {vanTotal, setVanTotal} = useContext(MileContext);
        const {mealCost, setMealCost} = useContext(MileContext);
        const {vanFuelCost, setVanFuelCost} = useContext(MileContext);
        const {rental26Cost, setRental26Cost} = useContext(MileContext);
        const {rental16Cost, setRental16Cost} = useContext(MileContext);
        const {truck26Fuel, setTruck26Fuel} = useContext(MileContext);
        const {truck16Fuel, setTruck16Fuel} = useContext(MileContext);
        const {trip, setTrip} = useContext(MileContext);
        const {locationOne, setLocationOne} = useContext(MileContext);
        const {locationTwo, setLocationTwo} = useContext(MileContext);
        const {gas, setGas} = useContext(MileContext);
        const {diesel, setDiesel} = useContext(MileContext);
        
        // const calculateHours = Math.round(totalMiles / 75);
        // const howManyMeals = Math.round(totalMiles / 300);
        const mealCalculator = (howManyMeals * KEY_NUMBERS.AVG_MEAL_PRICE) * drivers;
        const drivingDaysCalculator = Math.ceil(totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT);
        const hotelNightCalculator = drivingDaysCalculator - 1;
        const hotelTotalCost = KEY_NUMBERS.HOTEL_COST * hotelNightCalculator;
        const vanFuelCalculator = (totalMiles / KEY_NUMBERS.VAN_MPG) * KEY_NUMBERS.VAN_FUEL_COST;
        const laborCalculator = ((KEY_NUMBERS.HOURLY_FEE * calculateHours) * drivers);
        const vanCalculator = laborCalculator + vanFuelCalculator + hotelTotalCost + mealCalculator;
        const totalRentalDaysCalculator = drivingDaysCalculator + rentalPaddingDay;
        const rentalWeeklyRateCalculator = Math.floor(totalRentalDaysCalculator/7);
        const rentalDailyRateCalculator = totalRentalDaysCalculator%7;
        const rental26CostCalculator = (KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * rentalDailyRateCalculator) +
                        (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * rentalWeeklyRateCalculator) +  
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * (drivingDaysCalculator + rentalPaddingDay)) + 
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))
        const truck26FuelCalculator = ((totalMiles / KEY_NUMBERS.TRUCK_26_MPG) * KEY_NUMBERS.TRUCK_FUEL_COST);
        const truck26Calculator =  rental26CostCalculator + mealCalculator + laborCalculator + truck26FuelCalculator + hotelTotalCost;
        const rental16CostCalculator = (KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * rentalDailyRateCalculator) +
                        (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * rentalWeeklyRateCalculator) +  
                        (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * (drivingDaysCalculator + rentalPaddingDay)) + 
                        (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))
        const truck16FuelCalculator = ((totalMiles / KEY_NUMBERS.TRUCK_16_MPG) * KEY_NUMBERS.TRUCK_FUEL_COST);
        const truck16Calculator =  rental16CostCalculator + mealCalculator + laborCalculator + truck16FuelCalculator + hotelTotalCost;
        
        
        setDrivingDays(drivingDaysCalculator)
        setHours(calculateHours)
        setMeals(howManyMeals)
        setMealCost(mealCalculator)
        setHotelDays(hotelNightCalculator)
        setHotelTotal(hotelTotalCost)
        setVanFuelCost(vanFuelCalculator)
        setLaborCost(laborCalculator)
        setVanTotal(vanCalculator)

        setTruck26Total(truck26Calculator)
        setTruck26Fuel(truck26FuelCalculator)
        setRental26Cost(rental26CostCalculator)
        
        setTruck16Total(truck16Calculator)
        setTruck16Fuel(truck16FuelCalculator)
        setRental16Cost(rental16CostCalculator)
        
    };


