import React, {useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useAuth0 } from "@auth0/auth0-react";



    const Post = () => {
      const { getAccessTokenSilently } = useAuth0();

      const { register, errors, handleSubmit } = useForm();
      const onSubmit = data => postLocation(data);
      const APIURL = "http://localhost:5000/api/v1/locations/"
      async function postLocation(data){
        try {
        console.log(await getAccessTokenSilently({
          audience: 'https://quickstarts/api',
          scope: 'create:locations'
        }))
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJEZERNRFpFTXpNek1ERkNORGd4TVRBME9ESXlNVUZGUkRJeE1EQTFORGxFTlVJeVFqTkJNdyJ9.eyJpc3MiOiJodHRwczovL2Rldi01OXRtOWNhaC5hdXRoMC5jb20vIiwic3ViIjoiWmZIU0U0ejlMTFFSbFhQbGU5dDFEMTd6emJSTVhlUklAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcXVpY2tzdGFydHMvYXBpIiwiaWF0IjoxNTk0MTM1ODYwLCJleHAiOjE1OTQyMjIyNjAsImF6cCI6IlpmSFNFNHo5TExRUmxYUGxlOXQxRDE3enpiUk1YZVJJIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.Mopjj2EZeuokuYyoctdJDUuRXPi9tY5YjV13ufnetgz6JEQCyLVKMlhNGJarRv0l42lTlS5s4_W4qr3jXxSDUBFA88x9B1DcnKMEmx0o9M1jAJO3GB6F2oySTTDpcNKKhLf6Boa7XW7_iAKZaXetDqHowWIG0AbrXF9vdd7UhouZmp_vGC5Ir-epXIieDVmY36X3ivgWH1-6t_VQ7P4IAla-r1SmdX0s5JiG4W-Culqs7J_ve5hJuCI4DTNojwQT08smDg12DRepjjKoHuS-QW91Yx7aWnx_aEALohauyt_R0rqjzzSLEP1aGelc4fjPNtCEJ-6GxRSkTp6762ebPQ"

        console.log("token =" + token)
        const res = await fetch(`${APIURL}`,{
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
        });
        return res.json();
        } catch(e){
          console.log(e)
        }


        }

      return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Location Name"
              name="slug"
              ref={register( {require: true, minLength: 3})}
            />
            {errors.slug && "Location Name is required and must be at least 3 characters"}
            <input
              type="text"
              placeholder="gps coordinates"
              name="gps"
              ref={register({ require: true, minLength: 6})}
            />
            {errors.gps && "Gps is required and must but at least 6 characters"}
            <input type="submit"/>
          </form>
          {/* <span>{JSON.stringify(indexLocations)}</span> */}
        </div>
      )
    };

export default Post;


