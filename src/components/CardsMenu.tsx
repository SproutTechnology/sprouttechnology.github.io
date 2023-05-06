import MenuCard from "./MenuCard";

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

function CardsMenu() {
  return (
    <nav>
      <ul className="@container gap-6 grid fluid-gap grid-cols-menu-grid justify-center">
        {menuItems.map(({ title, color }) => (
          <MenuCard color={color} title={title}></MenuCard>
        ))}
      </ul>
    </nav>
  );
}

export default CardsMenu;
