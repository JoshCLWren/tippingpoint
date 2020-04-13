import React from "react";
import "./main.css";
import {KEY_NUMBERS} from "./keyValues";
import {PRESETS} from "./presets";

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
                        <option value={PRESETS.TUL_FULL_TRIP}>TULSA RUN</option>
                        <option value={PRESETS.OKC_FULL_TRIP}>OKC RUN</option>
                        <option value={PRESETS.TEXAS_FULL_TRIP}>TEXAS RUN</option>
                        <option value={PRESETS.alb}>ALB</option>
                        <option value={PRESETS.bao}>BAO</option>
                        <option value={PRESETS.bnb}>BNB</option>
                        <option value={PRESETS.cen}>CEN</option>
                        <option value={PRESETS.cta}>CTA</option>
                        <option value={PRESETS.edm}>EDM</option>
                        <option value={PRESETS.fts}>FTS</option>
                        <option value={PRESETS.ftw}>FTW</option>
                        <option value={PRESETS.hnv}>HNV</option>
                        <option value={PRESETS.jnk}>JNK</option>
                        <option value={PRESETS.klr}>KLR</option>
                        <option value={PRESETS.mor}>MOR</option>
                        <option value={PRESETS.msf}>MSF</option>
                        <option value={PRESETS.mus}>MUS</option>
                        <option value={PRESETS.ncs}>NCS</option>
                        <option value={PRESETS.nor}>NOR</option>
                        <option value={PRESETS.okc}>OKC</option>
                        <option value={PRESETS.omh}>OMH</option>
                        <option value={PRESETS.opk}>OPK</option>
                        <option value={PRESETS.ows}>OWS</option>
                        <option value={PRESETS.rga}>RGA</option>
                        <option value={PRESETS.rrn}>RRN</option>
                        <option value={PRESETS.sba}>SBA</option>
                        <option value={PRESETS.shw}>SHW</option>
                        <option value={PRESETS.soc}>SOC</option>
                        <option value={PRESETS.spf}>SPF</option>
                        <option value={PRESETS.sto}>STO</option>
                        <option value={PRESETS.stw}>STW</option>
                        <option value={PRESETS.tul}>TUL</option>
                        <option value={PRESETS.wch}>WCH</option>
                        <option value={PRESETS.wel}>WEL</option>
                        <option value={PRESETS.wwk}>WWK</option>
                        <option value={PRESETS.ykn}>YKN</option>
                        <option value={PRESETS.ikea}>Ikea</option>
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