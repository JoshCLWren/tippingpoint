import React, {useState, useEffect } from 'react'


    const Post = () => {

      const [indexLocations, setIndexLocations] = useState({})


      async function postLocation()
            {
                const res = await fetch("http://localhost:5000/locations/")
                res
                  .json()
                  .then(res => setIndexLocations(res))
            }

        useEffect(() => {
            postLocation()
        }, []);

      return (
        <div>
          <form>
            <input
              type="text"
              placeholder="Location Name"
              name="slug"
            />
            <input
              type="text"
              placeholder="gps coordinates"
              name="gps"
            />
            <input type="submit"/>
          </form>
          {/* <span>{JSON.stringify(indexLocations)}</span> */}
        </div>
      )
    };

export default Post;


