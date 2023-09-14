type Props = {
    children: React.ReactNode,
    minXPad:number,
}

export function CenterMaxWidth(props: Props) {
    return (
        <div className="flex justify-center w-full">
            <div className={`flex px-${props.minXPad} 5xl:px-0 max-w-4xl`}>
                {props.children}
            </div>
        </div>
    )
}