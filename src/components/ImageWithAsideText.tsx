import classNames from "classnames";

interface Props {
  position?: string;
  text: string;
  topTitle: string;
  bottomTitle: string;
  imageSrc: string;
  textFirst?: boolean;
}

function ImageWithTextRow({
  position,
  textFirst = false,
  text,
  topTitle,
  bottomTitle,
  imageSrc,
}: Props) {
  return (
    <div
      className={classNames({
        flex: true,
        "@container": true,
        "justify-end": position === "right",
        "justify-center": position === "center",
      })}
    >
      <div
        className={classNames(
          {
            "flex max-w-full @3xl:max-w-[60%] @lg:gap-14 @lg:flex flex-wrap @lg:flex-nowrap flex" : true,
            "flex-row-reverse": textFirst,
          }
        )}
      >
        <img
          src={imageSrc}
          className="basis-full rounded-2xl w-6/12 min-w-[50%] object-cover"
        />
        <aside className="@lg:pt-6">
          <div className="grid grid-cols-[min-content_auto] @lg:grid-cols-[min-content_min-content] col-span-full">
            <h2 className="whitespace-nowrap">{topTitle}</h2>

            <h2 className="row-start-2 col-start-2 -ml-16 whitespace-nowrap">
              {bottomTitle}
            </h2>
            <p className="row-start-3 col-span-full">{text}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ImageWithTextRow;
