import { ReactNode, lazy } from 'react';
import { overideTailwindCssClasses } from '../utils/cssUtils';

export type QuoteBoxProps = {
  children: ReactNode,
  cssOverrides?: string,
}

export default function QuoteBox(props: QuoteBoxProps) {

  // const cssDefault = "outline outline-blue-500 border rounded bg-white p-4 px-6";
  const cssDefault = "shadow-md rounded bg-white p-4 px-6";
  const css = !props.cssOverrides ? cssDefault : overideTailwindCssClasses(cssDefault, props.cssOverrides);

  return (
    <div className={css}>
      {props.children}
    </div>
  )
}