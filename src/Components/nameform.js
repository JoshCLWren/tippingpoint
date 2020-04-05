import React from "react";

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hotelCost: 125,
        hotelDays:  1,
        hotelTotal: 125,
      };
      this.onCostChange.bind(this);
      this.onDayChange.bind(this);
    }  

    onCostChange = (event) => {
      this.setState({hotelCost: event.target.value})
      this.setState({hotelTotal: event.target.value * this.state.hotelDays})
      console.log(this.state);
    }
    onDayChange = (event) => {
      this.setState({hotelDays: event.target.value})
      this.setState({hotelTotal: event.target.value * this.state.hotelCost})
      console.log(this.state);
    }


    render() {
      return (
            <form>
             Hotel cost
                <input 
                  type="number"
                  name="hotelCost"
                  defaultValue="125"
                  
                  onChange={this.onCostChange}/>

                *
                Nights in Hotel
                <input type="number"
                name="hotelDays"
                defaultValue="1"
                onChange={this.onDayChange}/>

                =
                <p>
                  {this.state.hotelTotal}
                </p>

            </form>

      );
    }
  }

  export default NameForm;