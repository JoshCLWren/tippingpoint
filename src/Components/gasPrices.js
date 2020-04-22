import React, { useState, useEffect } from 'react'


    const GasPrices = ({ gas, onGasPriceChange }) => {
        
            async function fetchUnleaded()
            {
                
                const apiKey = "0e4c0b87a783c8a1201273b16dca2e5d";
                const unleaded = await fetch("http://api.eia.gov/series/?api_key="+ apiKey +"&series_id=TOTAL.RUUCUUS.M")
                const unleadedPriceHistory = await unleaded.json();
                const gasArray = unleadedPriceHistory.series[0];
                console.log(gasArray)
                var gas = 1
                // onGasPriceChange(1);

            }         
            
        useEffect(() => {
          
            fetchUnleaded()
        }, [])

      return (
        <div>
            <input 
              type="number"
              name="gas"
              min="0"
              defaultValue={gas}
              onChange={onGasPriceChange}                      
            />
        </div>
      )
    };

export default GasPrices;