import React, { useEffect } from 'react'


    const DieselPrices = ({ diesel, onDieselPriceChange }) => {

            async function fetchDiesel()
            {

                const apiKey = "0e4c0b87a783c8a1201273b16dca2e5d";
                const dieselObject = await fetch("http://api.eia.gov/series/?api_key="+ apiKey +"&series_id=TOTAL.DFONUUS.M")
                const dieselPriceHistory = await dieselObject.json();
                const diesel = dieselPriceHistory.series[0].data[0][1];
                onDieselPriceChange(diesel);

            }

        useEffect(() => {

            fetchDiesel()
        }, [])

      return (
        diesel

      )
    };

export default DieselPrices;