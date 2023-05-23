export function HeaderText({ type,color, text }: { type: string, color : string, text : string }) {
  return (
    type === "h1" ? 
    <h1 css={{ color, fontSize: 'clamp(1rem, 10cqi, 6rem)' }}>{text}</h1>  : 
    <h2 css={{ color, fontSize: '2rem' }}>{text}</h2>
  )
}