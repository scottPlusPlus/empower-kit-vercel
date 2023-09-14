import { nowHHMMSS } from "../agnostic/utils/timeUtils";
import { ScoutCollection, ScoutInfo, ScoutItem } from "../shared/scoutTypes";

type ScoutResponse = {
    collection: ScoutCollection;
    items: Array<ScoutItem>;
    infos: Array<ScoutInfo>;
};

export async function fetchFromScoutRemix(): Promise<ScoutResponse> {
    console.log(`${nowHHMMSS()} sending request to scout.`);
    // Send the data to the server in JSON format.
    // API endpoint where we send form data.
    var endpoint = "https://empower-kit.com/api/collection";
    const bodyObj = { cid: "activists", key: "vercel5971795060311" };
    // Form the request for sending data to the server.
    const options = {
        // The method is POST because we are sending data.
        method: "POST",
        // Tell the server we're sending JSON.
        headers: {
            "Content-Type": "application/json",
        },
        // Body of the request is the JSON data we created above.
        body: JSON.stringify(bodyObj),
    };
    const response = await fetch(endpoint, options);
    if (response.status == 200) {
        const rj: ScoutResponse = await response.json();


        if (!rj.collection || !rj.items || !rj.infos) {
            console.log("invalid repsonse from remix");
            console.log(JSON.stringify(rj));
            return rj;
            // throw new Error("invalid repsonse from remix");
        }

        return rj;
    } else {
        const txt = await response.text();
        console.log("repsonse from remix: " + response.status);
        console.log("Jarvis server err: " + txt);
        throw new Error("invalid repsonse from remix");
    }
}
