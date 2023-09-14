
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(` handle api/echo`);
    const resObj = {
        time: "aiya",
        body: {...req.body}
    }
    res.status(200).json(resObj);
    return;
}
