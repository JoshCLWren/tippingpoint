import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { GET_ROUTES } from "../../GQL/gql";

const RouteOptions = () => {

  const { loading, error, data } = useQuery(GET_ROUTES);

  if (loading) return <option value="18">OKC financ RUn</option>;
  if (error) return <option value="18">OKC financ RUn</option>;


    return data.routes.map(({ id, name}) => (

      <option key={id} value={id}>
        {name}
      </option>

    ))

};

export default RouteOptions;