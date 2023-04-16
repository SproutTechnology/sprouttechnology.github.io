import classNames from "classnames";
import BrokenHeaderWithOptionalText from "./BrokenHeaderWithOptionalText";
interface Props {
  position?: string;
  text: string;
  topHeader: string;
  bottomHeader: string;
  imageSrc: string;
  textFirst?: boolean;
}

function ImageWithTextRow({
  position,
  textFirst = false,
  text,
  topHeader,
  bottomHeader,
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
        className={classNames({
          "flex max-w-full @3xl:max-w-[60%] @lg:gap-14 @lg:flex flex-wrap @lg:flex-nowrap flex":
            true,
          "flex-row-reverse": textFirst,
        })}
      >
        <img
          src={imageSrc}
          className="basis-full rounded-2xl w-6/12 min-w-[50%] object-cover"
        />
        <aside className="@lg:pt-6">
          <BrokenHeaderWithOptionalText
            bottomHeader={bottomHeader}
            topHeader={topHeader}
            text={text}
          />
        </aside>
      </div>
    </div>
  );
}

export default ImageWithTextRow;
