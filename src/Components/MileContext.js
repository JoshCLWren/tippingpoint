import React,{useState, createContext} from 'react';

export const MileContext = createContext();

export const MileProvider = props => {
    const [totalMiles, setTotalMiles] = useState(0);

    return (
        <MileContext.Provider value = {[totalMiles, setTotalMiles]}>
            {props.children}    
        </MileContext.Provider>
    )
}