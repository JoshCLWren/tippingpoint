import React from 'react';
import './Components/main.css';
import {MileProvider} from "./Components/MileContext";
import Header from "./Components/Header";
import PresetSelector from "./Components/PresetSelector";
import TotalDrivers from './Components/TotalDrivers';
import CustomTrip from "./Components/CustomTrip";
import RentalPaddingDay from './Components/RentalPaddingDay';
import CustomMiles from './Components/CustomMiles';
import Totals from './Components/Totals'
import DetailedExpenses from './Components/DetailedExpenses';

function App() {


  return (
    <MileProvider>
      <Header />
      <div className="column">
        <form>
        {/* <PresetSelector /> */}
        <CustomTrip />
        <CustomMiles />
        <TotalDrivers />
        <RentalPaddingDay />
        <Totals />
        </form>
      </div>
      <div className="column">  
        
        <DetailedExpenses />
      </div>
    </MileProvider>
  );
}

export default App;
