import { AB_FLAGS, getAbFlag } from "@/src/shared/abUtils";
import { useMemo, useState } from "react";

const titleCSS = "text-2xl font-bold py-2";
const cssTitlBg = "py-4 px-4 lg:px-8";

type Props = {
    children: React.ReactNode, 
    title: string, 
    titleId: string, 
    css:CssStuff,
    ipab:number,
    index: number,
    click: ClickDataT,
    startOpen?: boolean

}

type CssStuff = {
    sectionColorLight:string,
    sectionColorDark:string,
    sectionColorGrad:string,
    sectionTitle:string,
    linkNormal:string,
}

export function ExpandableSection(props: Props) {
    const [isExpanded, setIsExpanded] = useState(props.startOpen);
    const expandLinkText = isExpanded ? "[X]" : "[O]";

    const myCss = props.css;

    const handleTitleClick = () => {
        setIsExpanded(!isExpanded);
    };

    useMemo(
        () => {
            if (props.click.data == `${props.index}`){
                setIsExpanded(true);
            }
        },
        [props.click]
      );

    const useGrad = getAbFlag(props.ipab, AB_FLAGS.GRAD_OR_ALT);
    var cssSection = "";
    const light = !(props.index % 2 == 0);
    if (!useGrad){
        cssSection = light ? myCss.sectionColorLight : myCss.sectionColorDark + " text-white";
    }
    
    const cssSectionGradColor = "py-4 px-4 lg:px-8 bg-gradient-to-b from-stone-50 to-teal-50";
    
    const cssSectionBody = "p-4 " + (useGrad ? myCss.sectionColorGrad : "");



    return (
        <div className={cssSection}>
            <div className={cssTitlBg + " flex justify-between items-center cursor-pointer"} onClick={handleTitleClick}>
                <div className="flex-grow"></div>
                <h3 className={myCss.sectionTitle}>
                    {props.title}
                </h3>
                <div className="flex-grow"></div>
                <p className={myCss.linkNormal + " text-right"}>{expandLinkText}</p>
            </div>
            {isExpanded && (
                <div className={cssSectionBody}>
                    {props.children}
                </div>
            )}
        </div>
    );
}