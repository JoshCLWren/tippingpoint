import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import "./main.css";
import {GET_LOCATIONS, DELETE_LOCATIONS} from "../../GQL/gql";

  const Get = () => {

    const { loading, error, data } = useQuery(GET_LOCATIONS);
    const [deleteLocation] = useMutation(DELETE_LOCATIONS);

    if (loading) return <tbody><tr><td>Loading...</td></tr></tbody>;
    if (error) return <tbody><tr><td>Errror, are you logged in?</td></tr></tbody>;


    return data.locations.map(({ id, slug, gps }) => (
        <tbody key={id}>
            <tr>
              <td>{slug}</td>
              <td>{gps}</td>
              <td>
              <button className="danger" onClick={() => deleteLocation({variables: {id} })}>
                Delete Location
              </button>
              {/* <button onClick={() => updateLocation({variables: {id}})}>
                Update Location
              </button> */}
              </td>
            </tr>
          </tbody>
    ));
  };

export default Get;


