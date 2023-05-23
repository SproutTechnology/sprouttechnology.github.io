import MenuCard from "./Card";
import {css} from "@emotion/react"
interface MenuItem {
  color: string;
  title: string;
}

const menuItems: Array<MenuItem> = [
  {
    color: "#c2b07e",
    title: "Cases",
  },
  {
    color: "#8f755e",
    title: "Interviews",
  },
  {
    color: "#c2b07e",
    title: "Way of working",
  },
  {
    color: "#3b3734",
    title: "Get in touch",
  },
];


const container = css`
    container-type : inline-size;
    gap : 1rem;
    flex-wrap : wrap;
    justify-content : space-between;
    display : flex;
    padding : 0px;
   
`

function CardsMenu() {
  return (
    <nav>
      <ul css={container} >
        {menuItems.map(({ title, color }) => (
          <MenuCard small={true} color={color} title={title}></MenuCard>
        ))}
      </ul>
    </nav>
  );
}

export default CardsMenu;
