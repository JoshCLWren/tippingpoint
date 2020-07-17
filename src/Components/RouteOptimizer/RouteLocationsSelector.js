import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_LOCATIONS } from "../../GQL/gql";
import { useMileDispatch, useMileState } from '../TripCalculator/MileContext';
import AddLocationCheckbox from "./AddLocationCheckbox";

  const RouteLocationsSelector = (props) => {
    const {count} = useMileState()
    const dispatch = useMileDispatch()
    const [checked, setChecked] = useState(false);
    const handleClick = () => setChecked(!checked)

    var locationArray = [];

    function checkedLocations(id) {
      if (!locationArray.includes(id)) {
        return locationArray.push(id)

      } else {
        return locationArray.filter(function(e) { return e != id})
      }
    }



    const { loading, error, data } = useQuery(GET_LOCATIONS);

    if (loading) return <tbody><tr><td>Loading...</td><td></td><td></td></tr></tbody>;
    if (error) return <tbody><tr><td>Errror, are you logged in?</td><td></td><td></td></tr></tbody>;


    return data.locations.map(({ id, slug, gps }) => (
      <tbody key={id}>
        <tr>
          <td>{id}</td>
          <td>{slug}</td>
          <td>{gps}</td>
          <td>
            {/* <AddLocationCheckbox
              id={id}
            /> */}

          </td>
        </tr>
      </tbody>
    ))
  };

  export default RouteLocationsSelector;