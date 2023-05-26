import Card from "./Card";
import CardSize from "../enums/CardSize";
import styled from "@emotion/styled";
import {  useTheme } from '@emotion/react'

interface MenuItem {
  color: string;
  title: string;
}




const StyledList = styled.ul`
  padding : 0px;
  container-type : inline-size;
  gap : 1rem;
  justify-content : center;
  flex-wrap : wrap;
  display : flex;
`



function CardsMenu() {
  const theme = useTheme();
  const menuItems: Array<MenuItem> = [
    {
      color: theme.cardColors.beige,
      title: "Cases",
    },
    {
      color: theme.cardColors.brown,
      title: "Interviews",
    },
    {
      color: theme.cardColors.green,
      title: "Way of working",
    },
    {
      color: theme.cardColors.grey,
      title: "Get in touch",
    },
  ];
  
  

  return (
    <nav>
      <StyledList>
        {menuItems.map(({ title, color }) => (
          <Card size={CardSize.Medium} color={color} title={title} />
        ))}
      </StyledList>
    </nav>
  );
}

export default CardsMenu;
