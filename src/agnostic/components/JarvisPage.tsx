type Props = {
    children: React.ReactNode,
}

export function JarvisPage(props: Props) {
    return (
        <div className="flex justify-center w-full bg-gradient-to-r from-indigo-900 to-indigo-950">
            <div className={`flex flex-col w-full 5xl:px-0 max-w-4xl`}>
                {props.children}
            </div>
        </div>
    )
}