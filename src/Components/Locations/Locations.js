import React from 'react';
import "./main.css";
import Table from 'react-bootstrap/Table';
import Get from "./Get";
import Post from "./Post";

const Locations = () => {
  return(
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Location Name</th>
            <th>GPS Coordinates</th>
            <th>Options</th>
          </tr>
        </thead>
        <Get />
      </Table>
      <Post />
    </>
  )
}

export default Locations;