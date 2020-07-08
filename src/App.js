import React from 'react';
import './Components/main.css';
import {MileProvider} from "./Components/MileContext";
import Header from "./Components/Header";
import TotalDrivers from './Components/TotalDrivers';
import CustomTrip from "./Components/CustomTrip";
import RentalPaddingDay from './Components/RentalPaddingDay';
import Totals from './Components/Totals'
import DetailedExpenses from './Components/DetailedExpenses';
import Index from './Components/Index.js'
import Post from './Components/Post.js'

function App() {


  return (
    <MileProvider>
      <Header />
      {/* <div className="column">
        <form>
        <Totals />
        <CustomTrip />
        <TotalDrivers />
        <RentalPaddingDay />
        </form>
      </div>
      <div className="column">
        <DetailedExpenses />
      </div> */}
      <Index />
      <Post />
    </MileProvider>
  );
}

export default App;
