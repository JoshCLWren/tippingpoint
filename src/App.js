import React from 'react';
import './Components/main.css';
import {MileProvider} from "./Components/MileContext";
import Header from "./Components/Header";
import PresetSelector from "./Components/PresetSelector";
import TotalDrivers from './Components/TotalDrivers';

function App() {


  return (
    <MileProvider>

      <Header />
      <form>
      <PresetSelector />
      <TotalDrivers />
      </form>
    </MileProvider>
  );
}

export default App;
