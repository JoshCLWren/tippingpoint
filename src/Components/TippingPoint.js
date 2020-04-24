import React from "react";
import "./main.css";
import {KEY_NUMBERS} from "./keyValues";
import {PRESETS} from "./presets";
import CustomTrip from "./mapBoxAPI";
import GasPrices from "./gasPrices";
import DieselPrices from "./dieselPrices";

class TippingPoint extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
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
      }

      

      this.onTotalMileChange.bind(this);
      this.onDriversChange.bind(this);
      this.calculateTotals.bind(this);
      this.onRentalPaddingDay.bind(this);
      this.onLocationOneChange.bind(this);
      this.onLocationTwoChange.bind(this);
      this.onTotalMilesComputed.bind(this);
      this.onGasPriceChange.bind(this);
      this.onGasPriceCompute.bind(this);
      this.onDieselPriceChange.bind(this);
      this.onDieselPriceCompute.bind(this);
    }  

    calculateTotals = () =>{
      const calculateHours = Math.round(this.state.totalMiles / 75);
      const howManyMeals = Math.round(this.state.totalMiles / 300);
      const mealCalculator = (howManyMeals * KEY_NUMBERS.AVG_MEAL_PRICE) * this.state.drivers;
      const drivingDaysCalculator = Math.ceil(this.state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT);
      const hotelNightCalculator = drivingDaysCalculator - 1;
      const hotelTotalCost = KEY_NUMBERS.HOTEL_COST * hotelNightCalculator;
      const vanFuelCalculator = (this.state.totalMiles / KEY_NUMBERS.VAN_MPG) * this.state.gas;
      const laborCalculator = ((KEY_NUMBERS.HOURLY_FEE * calculateHours) * this.state.drivers);
      const vanCalculator = laborCalculator + vanFuelCalculator + hotelTotalCost + mealCalculator;
      const totalRentalDaysCalculator = drivingDaysCalculator + this.state.rentalPaddingDay;
      const rentalWeeklyRateCalculator = Math.floor(totalRentalDaysCalculator/7);
      const rentalDailyRateCalculator = totalRentalDaysCalculator%7;
      const rental26CostCalculator = (KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * rentalDailyRateCalculator) +
                         (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * rentalWeeklyRateCalculator) +  
                         (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * (drivingDaysCalculator + this.state.rentalPaddingDay)) + 
                         (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (this.state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))
      const truck26FuelCalculator = ((this.state.totalMiles / KEY_NUMBERS.TRUCK_26_MPG) * this.state.diesel);
      const truck26Calculator =  rental26CostCalculator + mealCalculator + laborCalculator + truck26FuelCalculator + hotelTotalCost;
      const rental16CostCalculator = (KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * rentalDailyRateCalculator) +
                         (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * rentalWeeklyRateCalculator) +  
                         (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * (drivingDaysCalculator + this.state.rentalPaddingDay)) + 
                         (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (this.state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))
      const truck16FuelCalculator = ((this.state.totalMiles / KEY_NUMBERS.TRUCK_16_MPG) * this.state.diesel);
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
      
    };


    onTotalMileChange = (event) => {
      this.setState({totalMiles: parseInt(event.target.value)},this.calculateTotals)    
    };
    onDriversChange = (event) => {
      this.setState({drivers: parseInt(event.target.value)}, this.calculateTotals)
    };
    onRentalPaddingDay = (event) => {
      this.setState({rentalPaddingDay: parseInt(event.target.value)}, this.calculateTotals)
    };
    onLocationOneChange = (event) => {
      this.setState({locationOne: event.target.value}, this.calculateTotals)
    }
    onLocationTwoChange = (event) => {
      this.setState({locationTwo: event.target.value}, this.calculateTotals)
    }
    onTotalMilesComputed = (totalMiles, value) => {
      this.setState({totalMiles: value * 2 }, this.calculateTotals)
    }
    onGasPriceChange = (gas, value) => {
      this.setState({gas: value}, this.calculateTotals)
    }
    onGasPriceCompute = (event) => {
      this.setState({gas: parseInt(event.target.value)}, this.calculateTotals)
    }
    onDieselPriceChange = (diesel, value) => {
      this.setState({diesel: value}, this.calculateTotals)
    }
    onDieselPriceCompute = (event) => {
      this.setState({diesel: parseInt(event.target.value)}, this.calculateTotals)
    }


    render(){


      // pad truck trip miles by round trip total for picking up and returning truck
      
      return (
            <div className="wrapper">
              <div className="header">
                <div><h1>Trip Calculator</h1></div>
                <div><h2>'The Tipping Point'</h2></div>
              </div>
              <div>
                <form>
                  <div className="column">
                  <div>
                    <label>
                    <h3>Select a preset for your trip:</h3>
                      <select value={this.state.totalMiles} onChange={this.onTotalMileChange}>
                        <option value="0">Custom Trip</option>
                        {
                          Object.entries(PRESETS).map(([campus, mileage]) => (
                          <option key={campus} value={mileage}>
                            {campus}
                          </option>
                        ))} 
                      </select>
                    </label>
                  </div>
                  <div>
                    <div>
                      <h3>Enter Miles For a Custom Trip</h3>
                      <input 
                        type="number"
                        name="totalMiles"
                        defaultValue="0"
                        min="1"
                        onChange={this.onTotalMileChange}/>
                    </div>
                    <div>
                      <p>Trip Builder</p>
                          <CustomTrip totalMiles={this.state.totalMiles} locationOne={this.state.locationOne} 
                          locationTwo={this.state.locationTwo} onLocationOneChange={this.onLocationOneChange} 
                          onLocationTwoChange={this.onLocationTwoChange} onTotalMilesComputed={this.onTotalMilesComputed.bind(this, "totalMiles")}/>
                    </div>
                    <div>
                      <p>Total Drivers</p>
                        <select value={this.state.drivers} onChange={this.onDriversChange}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                    </div>
                    <div>
                      <p>Adjust the Rental Padding Day or add extra days to truck rental?</p>
                      <input 
                        type="number"
                        name="rentalPaddingDay"
                        min="1"
                        defaultValue="1"
                        onChange={this.onRentalPaddingDay}                      
                      />
                    </div>
                    </div>
                    <div>
                     <div >
                        <p>Van Trip Total</p>
                          <p>
                          ${this.state.vanTotal.toFixed(2)}
                          </p>
                      </div> 
                    <div>
                      <p>26 Foot Rental Truck Trip Total</p>
                      {/* add radio button for 2 day and 1 day truck return period */}
                        <p>
                          ${this.state.truck26Total.toFixed(2)}
                        </p>
                    </div>
                    <div>
                      <p>16 Foot Rental Truck Trip Total</p>
                      {/* add radio button for 2 day and 1 day truck return period */}
                        <p>
                          ${this.state.truck16Total.toFixed(2)}
                        </p>
                    </div>
                    </div>
                    </div>
                    <div className="column">
                      <div>
                        <p>Total Miles of Trip  {this.state.totalMiles}</p>
                        <p>Driving days      {this.state.drivingDays}</p>
                        <p>Nights         {this.state.hotelNights}</p>
                        <p>Hotel cost       ${this.state.hotelTotal}</p>
                        <p>Meals         {this.state.meals}</p>
                        <p>Meals Cost       ${this.state.mealCost}</p>
                        <p>hours         {this.state.hours}</p>
                        <p>Labor cost       ${this.state.laborCost}</p>
                        <p>Van Fuel cost     ${this.state.vanFuelCost.toFixed(2)}</p>
                        <p>Last Month's National Average Gas Price $
                          
                            <GasPrices gas={this.state.gas} onGasPriceChange={this.onGasPriceChange.bind(this, "gas")}/>
                            <div>
                              Gas Price Override
                              <input 
                                type="number"
                                name="gas"
                                min="0"
                                defaultValue={this.state.gas}
                                onChange={this.onGasPriceCompute}                      
                              />
                          </div>
                          
                        </p>  
                        <p>Last Month's National Average Diesel Price $
                          
                            <DieselPrices diesel={this.state.diesel} onDieselPriceChange={this.onDieselPriceChange.bind(this, "diesel")}/>
                            <div>
                              Diesel Price Override
                              <input 
                                type="number"
                                name="diesel"
                                min="0"
                                defaultValue={this.state.diesel}
                                onChange={this.onDieselPriceCompute}                      
                              />
                          </div>
                          
                        </p>  
                        <p>Rental Fees For a 26 foot truck      ${this.state.rental26Cost.toFixed(2)}</p>
                        <p>Rental Fees For a 16 foot truck      ${this.state.rental16Cost.toFixed(2)}</p>
                        <p>Diesel Cost    ${this.state.truck26Fuel.toFixed(2)}</p>
                      </div>
                    </div>    
                </form>
              </div>
            </div>
      )
    }
}

  export default TippingPoint;