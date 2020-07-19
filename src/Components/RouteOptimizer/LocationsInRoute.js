import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ROUTE, DELETE_ROUTE_LOCATIONS } from "../../GQL/gql";

const LocationInRoute = (props) => {

  const passedId = props.id

  const { loading, error, data } = useQuery(GET_ROUTE, {
    variables: {id: passedId}
  });
  const [deleteRouteLocation] = useMutation(DELETE_ROUTE_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return data.route.locations.map(({ id, slug }) => (
    <>
      <li key={id}>
        {slug}
      </li>
      <button className="danger" onClick={() => deleteRouteLocation({variables: {id}, refetchQueries: [{query: GET_ROUTE}]})}>
        Remove
      </button>
    </>
  ))

  // return (

  // <button onClick={console.log(data)}>test</button>
  // )
};

export default LocationInRoute;