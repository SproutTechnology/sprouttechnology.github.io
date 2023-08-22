import Card from "./Card";
import CardSize from "../enums/CardSize";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useMemo } from "react";
import LinkToPage from "../enums/LinkToPage";

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
                buttonText: "Read more",
                title: "Sprout is us",
                linkTo: LinkToPage.SproutIsUs,
            },
            {
                color: theme.cardColors.green,
                buttonText: "Read more",
                title: "The vision",
                linkTo: LinkToPage.TheVision,
            },
            {
                color: theme.cardColors.grey,
                buttonText: "Read more",
                title: "Get in touch",
                linkTo: LinkToPage.GetInTouch,
            },
        ],
        [theme],
    );

    return (
        <nav>
            <StyledList>
                {menuItems.map(({ title, color, buttonText, linkTo }) => (
                    <Card
                        key={title}
                        buttonText={buttonText}
                        linkTo={linkTo}
                        text="We've all been in the business for a few years. Colleagues have come and gone. "
                        initialWidth={CardSize.Medium}
                        color={color}
                        title={title}
                    />
                ))}
            </StyledList>
        </nav>
    );
}

export default CardsMenu;
