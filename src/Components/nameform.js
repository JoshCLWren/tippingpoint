import React from "react";
import "./main.css";
import {KEY_NUMBERS} from "./keyValues";

class NameForm extends React.Component {
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
        truckTotal: 0,
        vanTotal: 0,
        mealCost: 0,
        vanFuelCost: 0,
        rentalCost: 0,
        truckFuel: 0,
        trip: "Custom"       
      };
      this.onTotalMileChange.bind(this);
      this.onDriversChange.bind(this);
      this.calculateTotals.bind(this);
    }  
    calculateTotals = () =>{
      const calculateHours = Math.round(this.state.totalMiles / 75);
      const howManyMeals = Math.round(this.state.totalMiles / 300);
      const mealCalculator = (howManyMeals * KEY_NUMBERS.AVG_MEAL_PRICE) * this.state.drivers;
      const drivingDaysCalculator = Math.ceil(this.state.totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT);
      const hotelNightCalculator = drivingDaysCalculator - 1;
      const hotelTotalCost = KEY_NUMBERS.HOTEL_COST * hotelNightCalculator;
      const vanFuelCalculator = (this.state.totalMiles / KEY_NUMBERS.VAN_MPG) * KEY_NUMBERS.VAN_FUEL_COST;
      const laborCalculator = ((KEY_NUMBERS.HOURLY_FEE * calculateHours) * this.state.drivers);
      const vanCalculator = laborCalculator + vanFuelCalculator + hotelTotalCost + mealCalculator;
      const rentalCostCalculator = (KEY_NUMBERS.ENTERPRISE_DAILY_FEE * drivingDaysCalculator + KEY_NUMBERS.RENTAL_PADDING_DAY) + 
                         (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * drivingDaysCalculator + KEY_NUMBERS.RENTAL_PADDING_DAY) + 
                         (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (this.state.totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))
      const truckFuelCalculator = ((this.state.totalMiles / KEY_NUMBERS.TRUCK_MPG) * KEY_NUMBERS.TRUCK_FUEL_COST);
      const truckCalculator =  rentalCostCalculator + mealCalculator + laborCalculator + truckFuelCalculator + hotelTotalCost;
      
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
        truckTotal: truckCalculator,
        rentalCost: rentalCostCalculator,
        truckFuel: truckFuelCalculator
      }
      this.setState(newState);
      console.log(laborCalculator);
    };

    onTotalMileChange = (event) => {
      this.setState({totalMiles: parseInt(event.target.value)},this.calculateTotals);
    
    };
    onDriversChange = (event) => {
      this.setState({drivers: parseInt(event.target.value)}, this.calculateTotals)
    };

    
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
                    Select your trip
                      <select value={this.state.totalMiles} onChange={this.onTotalMileChange}>
                        <option value="0">Custom Trip</option>
                        <option value="6084">ALB</option>
                        <option value="540">BAO</option>
                        <option value="256">CTA</option>
                        <option value="40">BNB</option>
                      </select>
                    </label>

                  </div>
                  <div className="left">
                    <div className="item">
                      <p>Enter Miles For a Custom Trip</p>
                      <input 
                        type="number"
                        name="totalMiles"
                        defaultValue="0"
                        onChange={this.onTotalMileChange}/>
                    </div>
                      
                    <div className="item">
                      <p>Total Drivers</p>
                        <input
                          type="number"
                          name="drivers"
                          defaultValue="1"
                          onChange={this.onDriversChange}
                        />
                    </div>
                    </div>
                    <div className="left">
                     <div >
                        <p>Van Trip Total</p>
                          <p>
                          ${this.state.vanTotal}
                          </p>
                      </div> 
                    
                    <div>
                      <p>Truck Trip Total</p>
                      {/* add radio button for 2 day and 1 day truck return period */}
                        <p>
                          ${this.state.truckTotal}
                        </p>
                    </div>

                    </div>
                    </div>
                    <div className="column">
                      <div>
                        <p>Total Miles of Trip {this.state.totalMiles}</p>
                      </div>
                      <div>
                      <p>Driving days {this.state.drivingDays}</p>
                      </div>
                      <div>
                        <p>Nights {this.state.hotelNights}</p>
                      </div>

                      <div>
                      <p>Hotel cost ${this.state.hotelTotal}</p>
                      
                      
                        <p>Meals {this.state.meals}</p>
                      
                      
                      <p>Meals Cost ${this.state.mealCost}</p>
                      
                      <p>hours {this.state.hours}</p>
                      <p>Labor cost ${this.state.laborCost}</p>
                          <p>Van Fuel cost ${this.state.vanFuelCost}</p>
                        <p>Rental Fees ${this.state.rentalCost}</p>
                      <p>Truck Fuel Cost ${this.state.truckFuel}</p>
                    </div>
                    </div>
                                  
                  
                  
                </form>

              </div>
            </div>
      )
    }
}

  export default NameForm;