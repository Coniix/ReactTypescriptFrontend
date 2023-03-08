import { SetStateAction, useState } from 'react';
import axios from 'axios';
import TableComp, {Actor} from "../components/TableComp";
import * as dotenv from 'dotenv'

const Delete = () => {
  const [actorId, setActorId] = useState("");
  let [data, setData] = useState<Actor[]>();

  console.log(process.env.DB_USER);
  console.log(process.env.ENV);
  console.log(process.env.DB_PORT);
    
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // alert(`The name you entered was: ${firstName} ${lastName}`)
    const deleteId = actorId
    axios.delete(`${process.env.DB_ADDRESS}/actors/${deleteId}`).then((response: { data: SetStateAction<Actor[] | undefined>; }) => {
      setData(response.data)
    }).catch((error: { response: { data: any; }; }) => {
        if( error.response ){
            console.log(error.response.data); // => the response payload 
        }
    });;
  }

  return (
    <div>
      <h1>Delete</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter actor ID:
          <input
            type="text" 
            value={actorId}
            onChange={(e) => setActorId(e.target.value)}
          />
        </label>
        <br></br><br></br>
        <input id="button" type="submit" />
      </form>
      {!data ? "" : 
          <h1>User Deleted</h1> 
      }
      {!data ? "" :  
                <TableComp 
                data = {data}
            />}
    </div>
  )
};
  
  export default Delete;