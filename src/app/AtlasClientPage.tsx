'use client';

import { useMemo, useState } from "react";
import AtlasClientComponent from "./AtlasClientComponent";

export default function AtlastClientPage() {

    const [serverDataProjects, setServerDataProjects] = useState([]);

    useMemo(() => {
        sendServerRequest();
    }, []);

    async function sendServerRequest(): Promise<void> {
        console.log("sending server request.");
        if (typeof window == 'undefined') {
            return;
        }
        // Send the data to the server in JSON format.
        // API endpoint where we send form data.
        const endpoint = '/api/atlas/projects';
        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: "",
        }
        const response = await fetch(endpoint, options);
        if (response.status == 200) {
            const rj = await response.json();
            //console.log("ssr: response from server:\n" + JSON.stringify(rj));
            setServerDataProjects(rj);
        } else {
            const txt = await response.text();
            console.log("server err: " + txt);
        }
    }

    return (
        <AtlasClientComponent projects={serverDataProjects} junk="WERWER"></AtlasClientComponent>
    )


}