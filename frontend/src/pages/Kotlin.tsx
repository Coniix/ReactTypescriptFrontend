import axios from "axios";
import { SetStateAction, useState } from "react";
import * as Generation from "../generation/generation_pb";
import * as GC from "../generation/generation_pb_service";
import { grpc as GRPCWeb } from "@improbable-eng/grpc-web";
import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";
import fs from "fs";
import {
  buildGenerationRequest,
  executeGenerationRequest,
  onGenerationComplete,
} from "./helpers";

// This is a NodeJS-specific requirement - browsers implementations should omit this line.
GRPCWeb.setDefaultTransport(NodeHttpTransport());

// Authenticate using your API key, don't commit your key to a public repository!
const metadata = new GRPCWeb.Metadata();
metadata.set("Authorization", "Bearer " + "sk-8u32MsTmPoaRY9lHmr0YlbyYt6VULJs51weRs5Tx3EMuQM0q");

// Create a generation client to use with all future requests
const client = new GC.GenerationServiceClient("https://grpc.stability.ai", {});
  
export interface multiMessages {
  data: Film[];
}

export interface Film {
  filmID: number;
  title: string;
  description: string;
 }

const Kotlin = () => {
  //Image generation

  const request = buildGenerationRequest("stable-diffusion-512-v2-1", {
    type: "text-to-image",
    prompts: [
      {
        text: "A dream of a distant galaxy, by Caspar David Friedrich, matte painting trending on artstation HQ",
      },
    ],
    width: 512,
    height: 512,
    samples: 1,
    cfgScale: 13,
    steps: 25,
    sampler: Generation.DiffusionSampler.SAMPLER_K_DPMPP_2M,
  });
  
  executeGenerationRequest(client, request, metadata)
    .then(onGenerationComplete)
    .catch((error) => {
      console.error("Failed to make text-to-image request:", error);
    });

   //Emd image generation


  // const [filmId, setFilmId] = useState("");
  // let [data, setData] = useState<Film>();
    
  // const handleSubmit = (event: { preventDefault: () => void; }) => {
  //   event.preventDefault();
  //   const searchId = filmId
  //   axios.get(`${globalThis.kotlinApiUrl}/films/${searchId}`).then((response: { data: SetStateAction<Film | undefined>; }) => {
  //     setData(response.data)
  //   }).catch((error: { response: { data: any; }; }) => {
  //       if( error.response ){
  //           console.log(error.response.data); // => the response payload 
  //       }
  //   });;
  // }

  return (
    <div>
      <h1>Search Movie</h1>
      {/* <form onSubmit={handleSubmit}>
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
            } */}
            
    </div>
  )
}
  
  export default Kotlin;