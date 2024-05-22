import { getIpAddressFromHeadersDict } from "@/src/agnostic/utils/ipUtils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`handle submitAnalytics ${req.body.event} - ${req.body.data}`);
    const hopefullyIp = getIpAddressFromHeadersDict(req.headers);
    const data = {
        events: [
            {
                ip: hopefullyIp,
                event: req.body.event,
                data: req.body.data,
                domain: "empower-vercel",
            },
        ],
    };
    // console.log("data: " + JSON.stringify(data));
    res.status(200).json("ok");
    const endpoint = "http://24.199.102.59/api/submitAnalytics";

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    const r = await fetch(endpoint, options);
    console.log("submit analytics status = " + r.status);
    if (r.status != 200){
        try {
            const t = await r.text();
            console.log("jarvis Err: " + t);
        } catch (_){
            console.log("jarvis Err: ??");
        }
    }
}
