import React, {useState} from 'react'
import { useForm } from "react-hook-form"

const AddLocationCheckbox = (props) => {
  const [checked, setChecked] = useState(false);
  const handleClick = () => setChecked(!checked)
  const { register,  errors } = useForm();




  return (
    <>
      <input type="checkbox"
            name="ids"
            checked={checked}
            onClick={() => handleClick()}
            onChange={() => props.checkedLocations(props.parseInt(id))}
            ref={register({ required: true, maxLength: 12 })}
      />
      {/* {errors.ids && <p>Routes can't contain more that 12 locations</p>} */}
    </>
  )

}

export default AddLocationCheckbox;