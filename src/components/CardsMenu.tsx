import Card from "./Card";
import CardSize from "../enums/CardSize";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useMemo } from "react";
import LinkToPage from "../enums/LinkToPage";

interface MenuItem {
    color: string;
    title: string;
    buttonText: string;
    linkTo: LinkToPage;
}

const StyledList = styled.ul`
    padding: 0px;
    container-type: inline-size;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    display: flex;
`;

function CardsMenu() {
    const theme = useTheme();

    const menuItems = useMemo(
        () => [
            {
                color: theme.cardColors.beige,
                buttonText: "Slide to",
                title: "Cases",
                linkTo: LinkToPage.StartPage
            },
            {
                color: theme.cardColors.brown,
                buttonText: "Jump to",
                title: "The people",
                linkTo: LinkToPage.SproutIsUs
            },
            {
                color: theme.cardColors.green,
                buttonText: "Run to",
                title: "The way",
                linkTo: LinkToPage.TheVision
            },
        ],
        [theme],
    );

    return (
        <nav>
            <StyledList>
                {menuItems.map(({ title, color, buttonText , linkTo}) => (
                    <Card
                        key={title}
                        buttonText={buttonText}
                        linkTo={linkTo}
                        text="We've all been in the business for a few years. Colleagues have come and gone. "
                        size={CardSize.Medium}
                        color={color}
                        title={title}
                    />
                ))}
            </StyledList>
        </nav>
    );
}

export default CardsMenu;
