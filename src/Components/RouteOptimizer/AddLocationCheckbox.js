// import React, {useState} from 'react'

// const AddLocationCheckbox = () => {
//   const [checked, setChecked] = useState(false);
//   const handleClick = () => setChecked(!checked)

//     var locationArray = [];

//     function checkedLocations(id) {
//       if (!locationArray.includes(id)) {
//         return locationArray.push(id)

//       } else {
//         return locationArray.filter(function(e) { return e != id})
//       }
//     }

//   return (
//     <>
//       <input type="checkbox"
//             checked={checked}
//             onClick={handleClick}
//             onChange={() => { checkedLocations(id); console.log(locationArray)}}

//       />
//     </>
//   )

// }

// export default AddLocationCheckbox;