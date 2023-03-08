import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import TableComp, { Actor } from "../components/TableComp";


export default function MyForm() {
  const apiUrl = "http://20.126.133.103:8080";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [data, setData] = useState<Actor[]>();


  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // alert(`The name you entered was: ${firstName} ${lastName}`)
    const actorDetails = { firstName: `${firstName}`, lastName: `${lastName}`};
    axios.post(`${apiUrl}/actors/`, actorDetails).then((response) => {
      console.log([response.data]);
      setData([response.data]);
    }).catch((error) => {
        if( error.response ){
            console.log(error.response.data); // => the response payload 
        }
    });;
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>Enter actor first name:      </label>
        <input
          type="text" 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

      <br></br><br></br>
      <label>Enter actor last name:</label>
        <input
          type="text" 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      
      <br></br><br></br>
      <input  id="button" type="submit" />
    </form>
    <br></br>
      {!data ? "" :  
      <TableComp 
      data = {data}
  />}
  </>
  )
}