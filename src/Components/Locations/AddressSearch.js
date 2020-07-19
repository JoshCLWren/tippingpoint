import React from 'react'
import { useForm } from "react-hook-form"
import { useMileDispatch, useMileState } from '../TripCalculator/MileContext';


const AddressSearch = () => {

  const {searchResults} = useMileState()
  const dispatch = useMileDispatch()



  const { register, handleSubmit } = useForm();

  async function fetchAddress(data)
            {
                console.log(data);
                const res = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + data.text + ".json?country=US&access_token=pk.eyJ1Ijoiam9zaGlzcGx1dGFyIiwiYSI6ImNqeTZwNGF1ODAxa2IzZHA2Zm9iOWNhNXYifQ.X0D2p9KD-IXd7keb199nbg")
                const searchResults = await res.json();
                console.log(res);
                const searchCoordinates = searchResults.features[0].center
                console.log(searchCoordinates)
                let gps = searchCoordinates.join();
                dispatch({type: 'searchResultsChange', payload: gps})

            }

        // useEffect(() => {
        //     fetchDistance()
        //     // eslint-disable-next-line
        // }, [locationOne, locationTwo]);

  const onSubmit = data => fetchAddress(data);

  return (
    <>
      <h3>GPS Coorinates Lookup</h3>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          name="text"
          type="text"
          placeholder="Enter address to search"
          ref={register({ required: true })}
        />

        <input type="submit" />

      </form>

      <span>{searchResults}</span>
    </>
  )

};


export default AddressSearch;