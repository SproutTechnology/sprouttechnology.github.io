import styled from "@emotion/styled";
import CardSize from "../enums/CardSize";
import Button from "./Button";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

interface StyledCard {
    color: string;
    size: CardSize;
}

interface Card {
    color: string;
    size: CardSize;
}
interface Card extends StyledCard {
    title: string;
    text: string;
    buttonText?: string;
    reverted?: boolean;
    linkTo: string;
}

export const CardWrapper = styled.div<{ reverted?: boolean } & StyledCard>(({ theme, reverted = false, size, color }) => [
    css`
        container-type: inline-size;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        color: ${reverted ? "white" : "black"};
        flex-shrink: 0;

        border-radius: ${theme.borderRadius};
        width: ${theme.cardSizes.width[size]};
        height: ${theme.cardSizes.height[size]};
        background-color: ${color};
    `,
]);

export const CardHeading = styled.h1`
    margin-bottom: 2.5rem;
    margin-top: unset;
    text-align: left;
    font-size: ${(props) => props.theme.fontSize.h2};
`;

export const CardContent = styled.div`
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`;

export const CardParagraph = styled.p`
    font-size: ${(props) => props.theme.fontSize.p};
`;

export const CardText = styled.div``;

function Card({ color, size, title, text, buttonText, linkTo, reverted }: Card) {
    return (
        <CardWrapper size={size} color={color} reverted={reverted}>
            <CardContent>
                <CardText>
                    <CardHeading>{title}</CardHeading>
                    <CardParagraph>{text}</CardParagraph>
                </CardText>
                <Link to={linkTo}>
                    <Button text={buttonText} small={size === CardSize.Small}></Button>
                </Link>
            </CardContent>
        </CardWrapper>
    );
}

export default Card;
