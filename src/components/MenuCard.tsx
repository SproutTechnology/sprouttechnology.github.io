interface MenuItem {
  color: string;
  title: string;
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function MenuCard({ title, color }: MenuItem) {
  return (
    <li
      style={{ backgroundColor: color }}
      className="h-card w-card rounded-xl flex items-end"
    >
      <div className="flex items-center w-full">
        <span className="p-2 font-semibold w-full">{title}</span>
        <FontAwesomeIcon
          size="lg"
          className="ml-auto mr-2 cursor-pointer"
          icon={faChevronRight}
        />
      </div>
    </li>
  );
}

export default MenuCard;
