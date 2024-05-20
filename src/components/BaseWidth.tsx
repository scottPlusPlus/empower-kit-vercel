type Props = {
    children: React.ReactNode,
}

export function BaseWidth(props: Props) {
    return (
        <div className="flex justify-center w-full">
            <div className={`flex flex-col w-full px-4 5xl:px-0 max-w-4xl`}>
                {props.children}
            </div>
        </div>
    )
}