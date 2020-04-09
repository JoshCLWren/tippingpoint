import React from "react";
import "./main.css";
import {KEY_NUMBERS} from "./keyValues";
import {CAMPUSES} from "./campuses";

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
        truckTotal: 0,
        vanTotal: 0,
        mealCost: 0,
        vanFuelCost: 0,
        rentalCost: 0,
        truckFuel: 0,
        rentalPaddingDay: 1,
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
      const rentalCostCalculator = (KEY_NUMBERS.ENTERPRISE_DAILY_FEE * (drivingDaysCalculator + this.state.rentalPaddingDay)) + 
                         (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * (drivingDaysCalculator + this.state.rentalPaddingDay)) + 
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
    onRentalPaddingDay = (event) => {
      this.setState({rentalPaddingDay: parseInt(event.target.value)}, this.calculateTotals)
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
                    Select your trip:
                      <select value={this.state.totalMiles} onChange={this.onTotalMileChange}>
                        <option value="0">Custom Trip</option>
                        <option value={CAMPUSES.TUL_FULL_TRIP}>TULSA RUN</option>
                        <option value={CAMPUSES.OKC_FULL_TRIP}>OKC RUN</option>
                        <option value={CAMPUSES.TEXAS_FULL_TRIP}>TEXAS RUN</option>
                        <option value={CAMPUSES.alb}>ALB</option>
                        <option value={CAMPUSES.bao}>BAO</option>
                        <option value={CAMPUSES.bnb}>BNB</option>
                        <option value={CAMPUSES.cen}>CEN</option>
                        <option value={CAMPUSES.cta}>CTA</option>
                        <option value={CAMPUSES.edm}>EDM</option>
                        <option value={CAMPUSES.fts}>FTS</option>
                        <option value={CAMPUSES.ftw}>FTW</option>
                        <option value={CAMPUSES.hnv}>HNV</option>
                        <option value={CAMPUSES.jnk}>JNK</option>
                        <option value={CAMPUSES.klr}>KLR</option>
                        <option value={CAMPUSES.mor}>MOR</option>
                        <option value={CAMPUSES.msf}>MSF</option>
                        <option value={CAMPUSES.mus}>MUS</option>
                        <option value={CAMPUSES.ncs}>NCS</option>
                        <option value={CAMPUSES.nor}>NOR</option>
                        <option value={CAMPUSES.okc}>OKC</option>
                        <option value={CAMPUSES.omh}>OMH</option>
                        <option value={CAMPUSES.opk}>OPK</option>
                        <option value={CAMPUSES.ows}>OWS</option>
                        <option value={CAMPUSES.rga}>RGA</option>
                        <option value={CAMPUSES.rrn}>RRN</option>
                        <option value={CAMPUSES.sba}>SBA</option>
                        <option value={CAMPUSES.shw}>SHW</option>
                        <option value={CAMPUSES.soc}>SOC</option>
                        <option value={CAMPUSES.spf}>SPF</option>
                        <option value={CAMPUSES.sto}>STO</option>
                        <option value={CAMPUSES.stw}>STW</option>
                        <option value={CAMPUSES.tul}>TUL</option>
                        <option value={CAMPUSES.wch}>WCH</option>
                        <option value={CAMPUSES.wel}>WEL</option>
                        <option value={CAMPUSES.wwk}>WWK</option>
                        <option value={CAMPUSES.ykn}>YKN</option>
                        <option value={CAMPUSES.ikea}>Ikea</option>
                      </select>
                    </label>
                  </div>
                  <div>
                    <div>
                      <p>Enter Miles For a Custom Trip</p>
                      <input 
                        type="number"
                        name="totalMiles"
                        defaultValue="0"
                        onChange={this.onTotalMileChange}/>
                    </div>
                    <div>
                      <p>Total Drivers</p>
                        <input
                          type="number"
                          name="drivers"
                          defaultValue="1"
                          onChange={this.onDriversChange}
                        />
                    </div>
                    <div>
                      <p>Adjust the Rental Padding Day? It is currently {this.state.rentalPaddingDay}</p>
                      <input 
                        type="number"
                        name="rentalPaddingDay"
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
                      <p>Truck Trip Total</p>
                      {/* add radio button for 2 day and 1 day truck return period */}
                        <p>
                          ${this.state.truckTotal.toFixed(2)}
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
                        <p>Rental Fees      ${this.state.rentalCost.toFixed(2)}</p>
                        <p>Truck Fuel Cost    ${this.state.truckFuel.toFixed(2)}</p>
                      </div>
                    </div>    
                </form>
              </div>
            </div>
      )
    }
}

  export default TippingPoint;