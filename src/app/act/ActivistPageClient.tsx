'use client'

import { ItemInfos } from "@/src/shared/scoutTypes";
import { PageDataT } from "@/src/shared/ActPageTypes";
import { parseToNumber } from "@/src/agnostic/utils/typeUtils";
import { nextJsOnClient } from "@/src/frontCode/nextJsUtils";
import ActivistsPageWithAb from "./ActivistPageWithAb";
import { numAsIpabOrRand } from "@/src/shared/abUtils";

type ApProps = {
  pageData: PageDataT,
  itemInfos: ItemInfos,
  searchParams: Record<string, unknown>
}
export default function ActivistsPage(props: ApProps) {

  const ipab = getAbParam(props.searchParams);
  return (
    <ActivistsPageWithAb
      pageData={props.pageData}
      itemInfos={props.itemInfos}
      searchParams={props.searchParams}
      ab={ipab}
    />
  );
}

function getAbParam(searchParams: Record<string, unknown>): number {
  var abParam = parseToNumber(searchParams['ab']);
  return abParam ?? 7;

  // if (!nextJsOnClient()) {
  //   return abParam ?? 0;
  // }
  // if (!abParam) {
  //   console.log("checking localStorage for ab param");
  //   abParam = parseToNumber(localStorage.getItem('ab'));
  // }
  // ipab = numAsIpabOrRand(abParam);
  // localStorage.setItem('ab', String(ipab));
  // return ipab;
}