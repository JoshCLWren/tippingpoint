import React, { useState, useEffect } from 'react'


    const GasPrices = ({ gas, onGasPriceChange }) => {
        
            async function fetchUnleaded()
            {
                
                const apiKey = "0e4c0b87a783c8a1201273b16dca2e5d";
                const unleaded = await fetch("http://api.eia.gov/series/?api_key="+ apiKey +"&series_id=TOTAL.RUUCUUS.M")
                const unleadedPriceHistory = await unleaded.json();
                const gas = unleadedPriceHistory.series[0].data[0][1];
                console.log("inside async:" + gas);
                
                onGasPriceChange(gas);

            }         
            
        useEffect(() => {
          
            fetchUnleaded()
        }, [])
        console.log("outside async:" + (gas))

      return (
        gas

      )
    };

export default GasPrices;