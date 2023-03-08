import useSWR from "swr";
import TableComp from "../components/TableComp";

export const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const ENDPOINT = "http://localhost:8080";


const Read = () => {
    const fetcher = (url: string) =>
    fetch(`${apiUrl}/${url}`).then((r) => r.json());
    const { data, mutate } = useSWR("actors/", fetcher);

    return (
        <div>  
            <h1>Read</h1>

            {!data ? "loading" :  
                <TableComp 
                data = {data}
            />}
        </div>  
    );
}
  
  export default Read;