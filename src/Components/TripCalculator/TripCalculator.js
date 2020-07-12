import React from 'react';
import "./main.css";
import Totals from "./Totals";
import CustomTrip from "./CustomTrip";
import TotalDrivers from "./TotalDrivers";
import RentalPaddingDay from "./RentalPaddingDay";
import DetailedExpenses from "./DetailedExpenses";

const TripCalculator = () => {
  return(
    <div>
      <div className="column">
          <Totals />
          <CustomTrip />
          <TotalDrivers />
          <RentalPaddingDay />
      </div>

      <div className="column">
        <DetailedExpenses />
      </div>
    </div>
  )
}

export default TripCalculator;