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
    <div className="grid grid-cols-[min-content_auto] @lg:grid-cols-[min-content_min-content] col-span-full">
      <h2 className="whitespace-nowrap">{topHeader}</h2>

      <h2 className="row-start-2 col-start-2 -ml-16 whitespace-nowrap">
        {bottomHeader}
      </h2>
      {text && <p className="row-start-3 col-span-full">{text}</p>}
    </div>
  );
}

export default BrokenHeaderWithOptionalText;
