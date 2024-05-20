import { CSS_ACTIVIST_CLASSES } from "@/src/shared/empowerCss";
import { PageSectionT } from "@/src/shared/pageTypes";
import React from "react";

export type TocProps = {
    sections: PageSectionT[],
    ipab:number,
    itemClicked:(index:number)=>void,
}

export function TableOfContents(props: TocProps) {

    const myCss = CSS_ACTIVIST_CLASSES(props.ipab);
    const cssLink = "text-xl " + myCss.linkNormal;
    const cssLi = "mb-2 list-disc text-gray-700";

    return (
      <ul className="pl-4">
        {props.sections.map((section: PageSectionT, index) => (
          <React.Fragment key={index}>
            <li className={cssLi}>
              <a href={`#s${index}`} className={cssLink} onClick={() => props.itemClicked(index)}>{section.title}</a>
            </li>
            {section.addSeparator && (
              <hr className="my-4 border-gray-300" />
            )}
          </React.Fragment>
        ))}
        <hr key="lastsep" className="my-4 border-gray-300" />
        <li key="more" className={cssLi}>
          <a href={`#sMore`} className={cssLink} onClick={() =>  props.itemClicked(props.sections.length)}>Everything And More !!</a>
        </li>
      </ul>
    )
  }