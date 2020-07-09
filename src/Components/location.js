import React, {useContext, useEffect } from 'react'
import { COORDS } from "./coords"
import { useMileDispatch, useMileState } from './MileContext';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const Location = () => {

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


    return data.locations.map(({ slug, gps }) => (

            <option key={slug} value={gps}>
            {slug}
            </option>

    ))





};

export default Location;