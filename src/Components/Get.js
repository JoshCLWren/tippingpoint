import React, {useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import "./main.css";
import { useAuth0 } from "@auth0/auth0-react";



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

    // const DELETE_LOCATIONS = gql`
    //   mutation DeleteLocation($id: String!) {
    //     deleteLocation(id: $id){
    //       id
    //     }
    //   }
    // `;

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
    const { loading, error, data } = useQuery(LOCATIONS);
    const [deleteLocation] = useMutation(DELETE_LOCATIONS)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;



    // async function fetchIndex()
    //       {
    //           const res = await fetch("http://localhost:5000/api/v1/locations/")
    //           res
    //             .json()
    //             .then(res => setIndexLocations(res))
    //       }

      // useEffect(() => {
      //     fetchIndex()
      // }, []);

    return data.locations.map(({ id, slug, gps }) => (

      <div key={id}>
        <p className="inLine" >
          {slug}: {gps}
        </p>
        Logged in
        <button className="inLine" onClick={() => deleteLocation({variables: {id} })}>
          Delete Location

        </button>
      </div>
    ));
  };

export default Get;


