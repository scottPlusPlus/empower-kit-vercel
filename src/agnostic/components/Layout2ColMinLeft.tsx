type Props = {
    leftContent: React.ReactNode,
    rightContent: React.ReactNode,
}

export function Layout2ColMinLeft(props:Props){
    return (
        <div className="flex flex-col md:flex-row md:gap-8">
        <div className='flex w-full md:w-min justify-center'>
               {props.leftContent}
        </div>
        <div className='w-grow pt-4 md:pt-0'>
          {props.rightContent}
        </div>
    </div>
    )

}