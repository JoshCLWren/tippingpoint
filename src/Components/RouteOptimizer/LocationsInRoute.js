import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ROUTE, DELETE_ROUTE_LOCATION_BY_IDS } from "../../GQL/gql";

const LocationInRoute = (props) => {
  const [deleteRouteLocationByIds] = useMutation(DELETE_ROUTE_LOCATION_BY_IDS);

  const passedId = props.id

  const { loading, error, data } = useQuery(GET_ROUTE, {
    variables: {id: parseInt(passedId)}
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return data.route.locations.map(({ id, slug }) => (
    <>
      <li key={id}>
        {slug}
      </li>
      <button className="danger" onClick={() => deleteRouteLocationByIds({variables: {locationId: parseInt(id), routeId: parseInt(passedId)}, refetchQueries: [{query: GET_ROUTE, variables: {id: parseInt(passedId)}}]})}>
        Remove
      </button>

    </>
  ))

  // return (


  // )
};

export default LocationInRoute;