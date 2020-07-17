import React, {useState} from 'react'

const AddLocationCheckbox = (props) => {
  const [checked, setChecked] = useState(false);
  const handleClick = () => setChecked(!checked)



  return (
    <>
      <input type="checkbox"
            checked={checked}
            onClick={() => handleClick()}
            onChange={() => props.checkedLocations(props.id)}
      />
    </>
  )

}

export default AddLocationCheckbox;