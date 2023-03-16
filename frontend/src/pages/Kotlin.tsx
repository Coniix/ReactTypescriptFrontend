import axios from "axios";
import { SetStateAction, useState } from "react";


export interface multiMessages {
  data: Film[];
}

export interface Film {
  filmID: number;
  title: string;
  description: string;
 }

const Kotlin = () => {
  const [filmId, setFilmId] = useState("");
  let [data, setData] = useState<Film>();
    
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const searchId = filmId
    axios.get(`${globalThis.kotlinApiUrl}/films/${searchId}`).then((response: { data: SetStateAction<Film | undefined>; }) => {
      setData(response.data)
    }).catch((error: { response: { data: any; }; }) => {
        if( error.response ){
            console.log(error.response.data); // => the response payload 
        }
    });;
  }

  return (
    <div>
      <h1>Search Movie</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter film ID:
          <input
            type="text" 
            value={filmId}
            onChange={(e) => setFilmId(e.target.value)}
          />
        </label>
        <br></br><br></br>
        <input id="button" type="submit" />
      </form><br></br>

      {!data ? "" : 
              <table>
                <thead>
                  <tr>
                    <th>Film ID</th>
                    <th>Film Title</th>
                    <th>Film Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={data.filmID}>
                    <td>{data.filmID}</td>
                    <td>{data.title}</td>
                    <td>{data.description}</td>
                  </tr>
                </tbody>
              </table>
            }
            
    </div>
  )
}
  
  export default Kotlin;