import { getIpAddressFromHeadersDict } from "@/src/agnostic/utils/ipUtils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`handle api/submitEmail`);
    const hopefullyIp = getIpAddressFromHeadersDict(req.headers);
    
    const data = {
        data: req.body.data,
        domain: req.body.domain,
        email: req.body.email,
        ip: hopefullyIp,
    };
    const endpoint = "http://24.199.102.59/api/submitEmail";

    // Form the request for sending data to the server.
    const options = {
        // The method is POST because we are sending data.
        method: "POST",
        // Tell the server we're sending JSON.
        headers: {
            "Content-Type": "application/json",
        },
        // Body of the request is the JSON data we created above.
        body: JSON.stringify(data),
    };
    console.log("sending email");
    const r = await fetch(endpoint, options);
    console.log("response status: = " + r.status);
    if (r.status != 200){
        try {
            const t = await r.text();
            console.log("jarvis Err: " + t);
        } catch (_){
            console.log("jarvis Err: ??");
        }
    }
    res.status(200).json("ok");
    return;
}