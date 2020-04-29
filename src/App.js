import React from 'react';
import './Components/main.css';
import {MileProvider} from "./Components/MileContext";
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
