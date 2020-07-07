import React, {useState, useEffect } from 'react'


    const Index = () => {

      const [indexLocations, setIndexLocations] = useState({})

      async function fetchIndex()
            {
                const res = await fetch("http://localhost:5000/locations/")
                res
                  .json()
                  .then(res => setIndexLocations(res))
            }

        useEffect(() => {
            fetchIndex()
        }, []);

      return (
        <div>
          <span>{JSON.stringify(indexLocations)}</span>
        </div>
      )
    };

export default Index;


