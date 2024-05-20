import Ico from "@/public/images/favicon.ico";
import OgImage from "@/public/images/empower-kit.png";
import { Metadata } from "next";

export const mainMetadata:Metadata = {
    title: "Empower-Kit",
    description:
    "A toolkit for activists.  Removing the barriers between 'wanting to help' and 'helping'",
    openGraph: {
        images: [
            {
                url: OgImage.src,
            },
        ],
    },
    icons: { icon: Ico.src },
};