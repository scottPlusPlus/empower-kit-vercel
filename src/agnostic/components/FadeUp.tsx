type Props = {
    children: React.ReactNode
    delayMs?:number
}

export default function FadeUp(props: Props) {
    
    const delay = props.delayMs ? props.delayMs : 200;

    return (
      <div  data-aos="fade-up" data-aos-delay={delay}>
        {props.children}
      </div>
    )
  }