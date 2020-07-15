import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const LocationOptions = () => {

  const LOCATIONS = gql`
        {
          locations {
            id
            slug
            gps
          }
        }
      `;
  const { loading, error, data } = useQuery(LOCATIONS);
  if (loading) return <option value="-73.778716,42.740913">ALB</option>;
  if (error) return <option value="-73.778716,42.740913">ALB</option>;


    return data.locations.map(({ id, slug, gps }) => (

      <option key={slug} value={gps}>
        {slug}
      </option>

    ))





};

export default LocationOptions;