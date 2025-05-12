'use client'

import { ItemInfos } from "@/src/shared/scoutTypes";
import { PageDataT, PageSectionT } from "@/src/shared/ActPageTypes";
import { useEffect, useState } from "react";
import { submitAnalytics } from "@/src/frontCode/dataUtils";
import { BaseWidth } from "@/src/components/BaseWidth";
import { CSS_ACTIVIST_CLASSES } from "@/src/shared/empowerCss";
import { AB_FLAGS, combineFlags, getAbFlag, numAsIpabOrRand, numStringAsIpab } from "@/src/shared/abUtils";

import heroImage0 from '@/public/images/empower_hero.png';
import heroImage1 from '@/public/images/empower_hero_2.png';
import heroImage2 from '@/public/images/empower_hero_3.png';
import heroImage3 from '@/public/images/empower_hero_4.png';
import titleImageP from '@/public/images/empower_title_p.png';
import titleImageG from '@/public/images/empower_title_g.png';
import SearchableItemDisplay from "@/src/components/scout/SearchableItemDisplay";
import ActivistNavHeader from "./ActivistNavHeader";
import { ExpandableSection } from "./ExpandableSection";
import PageSectionC from "./PageSectionC";
import { ScoutInfo } from "@/src/serverCode/scoutApi";
import { IntroQuote } from "./IntroQuote";
import { TableOfContents } from "./TableOfContents";


type ApProps = {
  pageData: PageDataT,
  itemInfos: ItemInfos,
  searchParams: Record<string, unknown>,
  ab:number,
}
export default function ActivistsPageWithAb(props: ApProps) {

  const ipab = props.ab;
  const sections: Array<PageSectionT> = props.pageData.sections ?? [];
  const uInfos: Array<ScoutInfo> = props.itemInfos.infos ?? [];

  const infoMap = new Map<string, ScoutInfo>();
  uInfos.forEach(info => {
    infoMap.set(info.url, info);
  });

  const [clickD, setClickD] = useState({ count: 0, data: "" });

  const myCss = CSS_ACTIVIST_CLASSES(ipab);
//   const heroImageIndex = combineFlags(getAbFlag(ipab, AB_FLAGS.HERO_1), getAbFlag(ipab, AB_FLAGS.HERO_2));
//   const heroImages = [heroImage0, heroImage1, heroImage2, heroImage3];
//   const heroImage = heroImages[heroImageIndex];

  //const topImage = getAbFlag(ipab, AB_FLAGS.COLOR) ? titleImageP : titleImageG;
  const addFooters = getAbFlag(ipab, AB_FLAGS.GRAD_OR_ALT);
  //console.log("image src = " + heroImage.src);

  const loadedItems = props.itemInfos.items.filter(item => {
    return infoMap.has(item.url);
  });

  useEffect(() => {
    //on first load
    //console.log("on first load...");
    const url = new URL(window.location.href);
    var ref = document.referrer.trim();
    if (ref.length > 0) {
      ref = " ref= " + ref;
    }
    //console.log("ref = " + ref);
    submitAnalytics("visit", url.toString() + ref);
  }, []);

  const handleLinkClick = (linkUrl: string) => {
    submitAnalytics("link", linkUrl);
  }

  const fakeSubmitAction = (action: string, actionData: string) => {
    return;
  }
  const setLoading = (loading: boolean) => {
    return;
  }

  const handleContentsClick = (index: number) => {
    setClickD({ count: clickD.count + 1, data: `${index}` });
  };

  return (
    <div className={myCss.defaultBg}>
      <ActivistNavHeader ipab={ipab} css={myCss} />
      <div className={myCss.standardPadding}>
        <BaseWidth>
          <p>{props.pageData.intro1}</p>
          <div className="py-2"></div>
          <h3 className={myCss.title}>Contents:</h3>
          <TableOfContents 
            sections={sections}
            ipab={props.ab}
            itemClicked={handleContentsClick}
          />
          <div className="py-2"></div>
          <IntroQuote
            text={props.pageData.intro2}
            updated={props.pageData.updated}
            ipab={props.ab}
          />
          <div className="py-4"></div>
        </BaseWidth>
      </div>

      {addFooters && (<div className={myCss.sectionFooter}></div>)}
      {sections.map((section, index) => (
        <section key={"s"+index} id={"s" + index}>
          <div>
            <ExpandableSection title={section.title} titleId={section.title} css={myCss} ipab={ipab} startOpen={index == 0} index={index} click={clickD}>
              <PageSectionC
                data={section}
                infoMap={infoMap}
                titleId={""}
                handleLinkClick={handleLinkClick}
                ipab={ipab}
                css={myCss}
                handleObserve={()=>submitAnalytics("visit-"+section.title, "")}
              />
            </ExpandableSection>
            {addFooters && (<div className={myCss.sectionFooter}></div>)}
          </div>
        </section>
      )
      )}

      <div className={myCss.sectionFooter}></div>
      <section id={"sMore"}>
        <div className={myCss.sectionColorGrad + " text-black " + myCss.standardPadding}>
          <h3 className={myCss.sectionTitle}>
            Everything and More
          </h3>
          <BaseWidth>
            <div >Here you can search through everything in the above sections, and even more cool stuff that didn't necessarily fit anywhere else.</div>
          </BaseWidth>

          <div className="py-4"></div>
          <SearchableItemDisplay
            loadedItems={loadedItems}
            initialTerms={[]}
            infoMap={infoMap}
            submitAnalytics={fakeSubmitAction}
            scoutCss={myCss}
          // submitAction={fakeSubmitAction}
          // setLoading={setLoading}
          // background=""
          />
        </div>
      </section>

    </div>
  );
}
