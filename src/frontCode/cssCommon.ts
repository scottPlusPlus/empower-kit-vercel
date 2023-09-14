import { ComponentType, ReactNode } from "react";

export type CssPropsCommon = {
    padding:string,
    actionButton?: ComponentType<ButtonProps>,
    textH1:string,
    textH2:string,
    textH3:string,
    textBase:string,
    textBaseBig:string,
    textLink:string,
    bgDark?:string,
    bgLight1?:string,
    bgLight2?:string,
    textDark?:string,
    textLight?:string,
}

export type ButtonProps = {
    handle: () => void;
    disabled?:boolean,
    children?: ReactNode;
  }
  