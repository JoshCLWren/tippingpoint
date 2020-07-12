import React from 'react';
import "./main.css";
import Totals from "./Totals";
import CustomTrip from "./CustomTrip";
import TotalDrivers from "./TotalDrivers";
import RentalPaddingDay from "./RentalPaddingDay";
import DetailedExpenses from "./DetailedExpenses";

const TripCalculator = () => {
  return(
    <>
      <div className="column">
        <form>
          <Totals />
          <CustomTrip />
          <TotalDrivers />
          <RentalPaddingDay />
        </form>
      </div>

      <div className="column">
        <DetailedExpenses />
      </div>
    </>
  )
}

export default TripCalculator;