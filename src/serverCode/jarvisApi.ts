import { nowHHMMSS } from "../agnostic/utils/timeUtils";
import { AtlasCreatorT } from "../shared/atlasApiShema";
import { Blob } from "../shared/jarvisTypes";

const jarvisRoot = 'http://24.199.102.59/api/';

export async function fetchFromJarvis(config:string, term:string|null): Promise<Array<AtlasCreatorT>> {
    console.log(`${nowHHMMSS()} sending request to Jarvis.`);
    // Send the data to the server in JSON format.
    // API endpoint where we send form data.
    var endpoint = jarvisRoot + 'atlas/projects';
    if (term && term.length > 0){
        endpoint = jarvisRoot + 'atlas/search';
    }
    const bodyObj = { config: config, term:term};
    // Form the request for sending data to the server.
    const options = {
        // The method is POST because we are sending data.
        method: 'POST',
        // Tell the server we're sending JSON.
        headers: {
            'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSON.stringify(bodyObj),
    }
    const response = await fetch(endpoint, options);
    if (response.status == 200) {
        const rj = await response.json();
        if (!rj || !Array.isArray(rj)){
            console.error("bad response from Jarvis");
            return [];
        }
        return rj;
    } else {
        const txt = await response.text();
        console.log("Jarvis server err: " + txt);
        return [];
    }
}

export async function fetchBlob(key:string):Promise<string> {
    console.log(`${nowHHMMSS()} Jarvis fetch blob ${key}`);

    var endpoint = jarvisRoot + 'blobs/getBlob';
    const bodyObj = { key: key};
    // Form the request for sending data to the server.
    const options = {
        // The method is POST because we are sending data.
        method: 'POST',
        // Tell the server we're sending JSON.
        headers: {
            'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSON.stringify(bodyObj),
    }
    const response = await fetch(endpoint, options);
    console.error("jarvis response = " + response.status);
    if (response.status == 200) {
        const rj: Blob = await response.json();
        if (!rj || !rj.data){
            console.error("bad response from Jarvis");
            throw new Error("bad repsonse from Jarvis");
        }
        return rj.data;
    } else {
        const txt = await response.text();
        console.log("Jarvis server err: " + txt);
        throw new Error("bad repsonse from Jarvis");
    }
}
