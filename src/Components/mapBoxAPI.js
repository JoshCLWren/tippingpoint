import React, { Component } from 'react'
import { COORDS } from "./coords"
import {locationOne, locationTwo} from "./TippingPoint"

class mapBoxAPI extends Component {
    componentDidMount(locationOne, locationTwo) {
        fetch("https://api.mapbox.com/directions/v5/mapbox/cycling/{locationOne};{locationTwo}?access_token=pk.eyJ1Ijoiam9zaGlzcGx1dGFyIiwiYSI6ImNqeTZwNGF1ODAxa2IzZHA2Zm9iOWNhNXYifQ.X0D2p9KD-IXd7keb199nbg")
        .then(res => res.json())
        .then((data) => {
            this.setState({ totalMiles: data.routes.distance })
        })
        .catch(console.log)
    }

}

export default mapBoxAPI;