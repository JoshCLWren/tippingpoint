import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import {GET_LOCATIONS} from "../../GQL/gql";

const LocationIDs = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <tbody><tr><td>Loading...</td><td></td><td></td></tr></tbody>;
    if (error) return <tbody><tr><td>Errror, are you logged in?</td><td></td><td></td></tr></tbody>;

    return data.locations.map(({ id, slug, gps }) => (

      <option key={slug} value={id}>
        {slug}
      </option>

    ))








}


export default LocationIDs;