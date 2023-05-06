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
          "flex max-w-full @3xl:max-w-[90%] @4xl:gap-14 @4xl:flex flex-wrap @4xl:flex-nowrap flex":
            true,
          "flex-row-reverse": textFirst,
        })}
      >
        <img
          src={imageSrc}
          className="basis-full rounded-2xl min-w-[50%] object-cover"
        />
        <aside className="@4xl:pt-6">
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
