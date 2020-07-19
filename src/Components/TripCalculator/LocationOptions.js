import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { GET_LOCATIONS } from "../../GQL/gql";

const LocationOptions = () => {

  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <option value="-73.778716,42.740913;-73.778716,42.740913">ALB</option>;
  if (error) return <option value="-73.778716,42.740913;-73.778716,42.740913">ALB</option>;


    return data.locations.map(({ id, slug, gps }) => (

      <option key={id} value={gps}>
        {slug}
      </option>

    ))

};

export default LocationOptions;