"use client"

import { AtlasCreatorT } from "@/shared/atlasApiShema";
import Image3x2 from "@/agnostic/components/Image3x2";
import { submitAnalytics } from "../frontCode/dataUtils";
import CircleImage from "../agnostic/components/CircleImage";
import { truncateString } from "../agnostic/utils/stringUtils";


type UrlViewProps = {
    info: AtlasCreatorT,
}

const AtlasCreatorViewComponent = (props: UrlViewProps) => {

    const project = props.info.project;
    var thisFullUrl = project.fullUrl;
    if (thisFullUrl === undefined) {
        console.log("error: no full url for: " + project.url);
        console.log(JSON.stringify(props.info));
        thisFullUrl = "??";
    }

    const handleLinkClick = (u: string) => {
        submitAnalytics('link-click', u);
    }

    const twitterUrl = "https://www.twitter.com/" + props.info.twitterHandle;

    var thisDisplayUrl = project.url;
    if (thisDisplayUrl.startsWith("www.")) {
        thisDisplayUrl = thisDisplayUrl.substring(4);
    }
    if (thisDisplayUrl.length > 32) {
        thisDisplayUrl = thisDisplayUrl.substring(0, 30) + "...";
    }

    return (
        <div className="shadow-md text-black bg-neutral-200">
            <div className="bg-white">
                <a onClick={() => handleLinkClick(thisFullUrl)} href={thisFullUrl} target="_blank">
                    <Image3x2 src={project.image} />
                </a>
                <div className="p-4">
                    <a className="text-blue-700 mb-2 text-sm" onClick={() => handleLinkClick(thisFullUrl)} href={thisFullUrl} target="_blank">
                        {thisDisplayUrl}
                    </a>
                    <h2 className="font-bold mb-2">{project.title}</h2>
                    <p className="text-gray-700 text-base">{truncateString(project.summary, 400)}</p>
                </div>
            </div>
            <div className="flex px-4 pt-4 pb-2 justify-left">
                <a className="text-blue-700 text-lg mr-2" onClick={() => handleLinkClick(twitterUrl)} href={twitterUrl} target="_blank">
                    <CircleImage src={props.info.twitterProfileImage} alt={props.info.twitterHandle + " profile image"} radius={32} cssBorderOverride={""}></CircleImage>
                </a>
                <a className="text-blue-700 text-lg" onClick={() => handleLinkClick(twitterUrl)} href={twitterUrl} target="_blank">
                    {props.info.twitterName}
                </a>
            </div>
            <div className="px-4 pb-4 mb-0">
                <div className="flex w-full mb-0">
                    <p className="text-sm">{props.info.twitterProfile}</p>
                </div>
            </div>
        </div>
    );
}

export default AtlasCreatorViewComponent;