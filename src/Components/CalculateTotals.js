import React from "react";
import "./main.css";
import {KEY_NUMBERS} from "./keyValues";
import {PRESETS} from "./presets";
import {MileContext} from "./MileContext";

    

export const CalculateTotals = () =>{
        const {totalMiles, setTotalMiles} = useContext(MileContext);
        const {drivers, setDrivers} = useContext(MileContext);
        const {rentalPaddingDay, setRentalPaddingDay} = useContext(MileContext);
        const calculateHours = Math.round(totalMiles / 75);
        const howManyMeals = Math.round(totalMiles / 300);
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
        
        var newState = {
        drivingDays: drivingDaysCalculator,
        hours: calculateHours,
        meals: howManyMeals,
        mealCost: mealCalculator,
        hotelNights: hotelNightCalculator,
        hotelTotal: hotelTotalCost,
        vanFuelCost: vanFuelCalculator,
        laborCost: laborCalculator,
        vanTotal: vanCalculator,
        truck26Total: truck26Calculator,
        rental26Cost: rental26CostCalculator,
        truck26Fuel: truck26FuelCalculator,
        truck16Total: truck16Calculator,
        rental16Total: rental16CostCalculator,
        truck16Fuel: truck16FuelCalculator,
        rental16Cost: rental16CostCalculator
        }
        this.setState(newState);
        console.log(laborCalculator);
    };
