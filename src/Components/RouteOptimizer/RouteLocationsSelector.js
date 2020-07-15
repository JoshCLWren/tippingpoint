import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_LOCATIONS } from "../../GQL/gql";
import { useMileDispatch, useMileState } from '../TripCalculator/MileContext';

  const RouteLocationsSelector = () => {
    const {count} = useMileState()
    const dispatch = useMileDispatch()


    const { loading, error, data } = useQuery(GET_LOCATIONS);

    if (loading) return <tbody><tr><td>Loading...</td><td></td><td></td></tr></tbody>;
    if (error) return <tbody><tr><td>Errror, are you logged in?</td><td></td><td></td></tr></tbody>;


    return data.locations.map(({ id, slug, gps }) => (
      <tbody key={id}>
        <tr>
          <td>{id}</td>
          <td>{slug}</td>
          <td>{gps}</td>
          <td>
          <button className="danger" onClick={(event) => dispatch({type: 'countClick' + count})} >
            Add Location to Route
            {count}
          </button>
          </td>
        </tr>
      </tbody>
    ))
  };

  export default RouteLocationsSelector;