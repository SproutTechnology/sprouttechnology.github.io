interface Props {
  text?: string;
  topHeader: string;
  bottomHeader: string;
}

function BrokenHeaderWithOptionalText({
  text,
  topHeader,
  bottomHeader,
}: Props) {
  return (
    <div className="grid grid-cols-[min-content_auto] @4xl:grid-cols-[min-content_min-content] col-span-full">
      <h3 className="font-size-large-title @4xl:font-size-large-title whitespace-nowrap">{topHeader}</h3>
      <h3 className="@4xl:font-size-large-title row-start-2 col-start-2 -ml-16 whitespace-nowrap">
        {bottomHeader}
      </h3>
      {text && <p className="row-start-3 col-span-full">{text}</p>}
    </div>
  );
}

export default BrokenHeaderWithOptionalText;
