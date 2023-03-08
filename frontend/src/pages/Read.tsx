import useSWR from "swr";
import TableComp from "../components/TableComp";


export const ENDPOINT = "http://localhost:8080";


const Read = () => {
    const apiUrl = "http://20.126.133.103:8080";

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