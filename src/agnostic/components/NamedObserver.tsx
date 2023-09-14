"use client"

import Observer from "./Observer"

type Props = {
    name:string,
    onObserve:(ar0:string)=>void
}

export default function AnalyticObserver(props: Props) {
    
    function onObserve():void {
        props.onObserve(props.name);
    }
    
    return (
        <Observer onFirstObserve={onObserve} ></Observer>
    )
}