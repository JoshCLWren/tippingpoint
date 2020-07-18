import React, {useEffect} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ROUTE, DELETE_ROUTE } from "../../GQL/gql";

const LocationInRoute = (props) => {

  const passedId = props.id

  const { loading, error, data } = useQuery(GET_ROUTE, {
    variables: {id: passedId}
  });
  const [deleteRouteocation] = useMutation(DELETE_ROUTE_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return data.route.locations.map(({ slug }) => (
    <li key={slug}>
      {slug}
    </li>
    <button className="danger" onClick={() => deleteRouteLocation({variables: {passedId}, refetchQueries: [{query: GET_ROUTE}]})}>
    Delete Location
    </button>
));

  // return (

  // <button onClick={console.log(data)}>test</button>
  // )
};

export default LocationInRoute;