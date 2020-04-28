import React, {useContext} from 'react';
import "./main.css";
import {PRESETS} from "./presets";
import { MileConsumer } from './MileProvider';


const PresetSelector = ({context}) => {
    const context = useContext(MileConsumer);
    return(
        <MileConsumer>
            <div>
                <label>
                    <h3>Select a preset for your trip (these are round trips from the warehouse and back)</h3>
                    <select value={this.state.totalMiles} onChange={this.onTotalMileChange}>
                        <option value="0">Custom Trip</option>
                        {
                        Object.entries(PRESETS).map(([campus, mileage]) => (
                        <option key={campus} value={mileage}>
                            {campus}
                        </option>
                        ))} 
                    </select>
                </label>
            </div>
        </MileConsumer>
    )
}

export default PresetSelector;