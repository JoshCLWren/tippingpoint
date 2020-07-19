import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { GET_ROUTES } from "../../GQL/gql";

const RouteOptions = () => {

  const { loading, error, data } = useQuery(GET_ROUTES);

  if (loading) return <option value="38">test</option>;
  if (error) return <option value="38">test</option>;


    return data.routes.map(({ id, name}) => (

      <option key={name} value={id}>
        {name}
      </option>

    ))

};

export default RouteOptions;