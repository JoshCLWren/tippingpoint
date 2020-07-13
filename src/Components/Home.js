import React from 'react';
import "./main.css";
import JumboTron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const Home = () => {
  return(
    <JumboTron>
      <Container>
        <div className="home">
          <h1>
            Welcome to The Pivotal Point.
          </h1>
          <h2>
            May you have traveling mercies.
          </h2>
          <p>Maybe add instructions/vision for the app here.</p>
        </div>
      </Container>
    </JumboTron>
  )


}

export default Home;