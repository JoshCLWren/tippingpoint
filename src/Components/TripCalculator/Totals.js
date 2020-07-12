import React from 'react';
import "./main.css";
import { useMileState } from './MileContext';
// import {useCalculateTotals} from "./CalculateTotals";


const Totals = () => {

    const {vanTotal, truck26Total, truck16Total} = useMileState()
    return(

            <div>
                <div >
                <p>Van Trip Total</p>
                <p className="total">
                    ${vanTotal.toFixed(2)}
                    </p>
                </div>
                <div>
                <p>26 Foot Rental Truck Trip Total</p>
                <p className="total">
                    ${truck26Total.toFixed(2)}
                </p>
                </div>
                <div>
                <p>16 Foot Rental Truck Trip Total</p>
                <p className="total">
                    ${truck16Total.toFixed(2)}
                </p>
                </div>
            </div>

    )
}

export default Totals;
