import React, {useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import "./main.css";
import { useAuth0 } from "@auth0/auth0-react";
import Table from 'react-bootstrap/Table'


  const Get = () => {
    // const { getAccessTokenSilently } = useAuth0();
    // const TOKEN = getAccessTokenSilently()


    const LOCATIONS = gql`
      {
        locations {
          id
          slug
          gps
        }
      }
    `;

    const DELETE_LOCATIONS = gql`
      mutation deleteLocation($id: String!){
        deleteLocation(
          input:{id: $id}){
        location{
          id
          slug
          gps
        }
      }
    }
    `;

    const UPDATE_LOCATIONS = gql`
      mutation updateLocation($id: String!){
        updateLocation(
          input:{id: $id, slug: $slug, gps: $gps}){
            location{
              id
              slug
              gps
            }
          }
      }
    `;
    const { loading, error, data } = useQuery(LOCATIONS);
    const [deleteLocation] = useMutation(DELETE_LOCATIONS);
    const [updateLocation] = useMutation(UPDATE_LOCATIONS);

    if (loading) return <tbody>Loading...</tbody>;
    if (error) return <tbody>Error loading database. Are you logged in?</tbody>;


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


