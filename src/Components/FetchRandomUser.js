import React from "react";

export default class FetchRandomUser extends React.Component {
    state = {
        loading: true,
        person: null
      }
      
      async componentDidMount() {
          const url = "https://api.randomuser.me/";
          const response = await fetch(url);
          const data = await response.json();
          this.setState({person: data.results[0], loading:false});
          console.log(data.results[0]);
        
      }

    render() {
        return (
            <div>
                {this.state.loading || !this.state.person ? (
                <div>loading...</div>
                 ) : (
                 <div>
                     <div>
                         {this.state.person.name.first}
                         {this.state.person.name.last}
                         <form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
                        <input type="range" id="a" value="50"/>>100
                        +<input type="number" id="b" value="50"/>>
                        =<output name="x" for="a b"></output>
                        </form>
                     </div>
                 </div>
                 )}
            </div>
        );
    }
}