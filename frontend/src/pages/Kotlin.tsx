import useSWR from "swr";

export interface multiMessages {
  data: Message[];
}

export interface Message {
  id: string;
  text: string;
 }

const Kotlin = () => {

    const fetcher = (url: string) =>
    fetch(`${globalThis.kotlinApiUrl}`).then((r) => r.json());
    const { data }: multiMessages = useSWR("/", fetcher);

    return (
        <div>  
            <h1>Kotlin</h1>

            {!data ? "Loading..." : 
              <table>
                <thead>
                  <tr>
                    <th>Message ID</th>
                    <th>Message Text</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((msg) => {
                    return (
                            <tr key={msg.id}>
                              <td>{msg.id}</td>
                              <td>{msg.text}</td>
                            </tr>
                          )
                  })}
                </tbody>
              </table>
            }
        </div>  
    );
}
  
  export default Kotlin;