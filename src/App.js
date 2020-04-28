import React from 'react';
import './App.css';
import TippingPoint from './Components/TippingPoint';
import MileProvider from './Components/MileProvider';
import Header from "./Components/Header";
import PresetSelector from "./Components/PresetSelector";

function App() {


  return (
    <MileProvider>
      <div>
      <Header />
      <PresetSelector />
      </div>
    </MileProvider>
  );
}

export default App;
