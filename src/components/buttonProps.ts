import { ReactNode } from "react";

export type ButtonProps = {
    disabled:boolean,
    handle: () => void;
    children: ReactNode;
  }
  