import useSWR from "swr";
import TableComp from "../components/TableComp";

const Read = () => {

    const fetcher = (url: string) =>
    fetch(`${globalThis.apiUrl}/${url}`).then((r) => r.json());
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