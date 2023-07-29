import styled from "@emotion/styled";
import CardSize from "../enums/CardSize";
import Button from "./Button";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

interface StyledCard {
    color: string;
    initialWidth: CardSize;
}

interface Card {
    color: string;
    initialWidth: CardSize;
    className? : string,
}
interface Card extends StyledCard {
    title: string;
    text: string;
    buttonText?: string;
    reverted?: boolean;
    linkTo: string;
}

export const CardWrapper = styled.div<{ reverted?: boolean } & StyledCard>(({ theme, reverted = false, initialWidth, color }) => [
    css`
        container-type: inline-size;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        color: ${reverted ? "white" : "black"};
        border-radius: ${theme.borderRadius};
        min-height : ${theme.cardSizes.height[initialWidth]};
        width : 100%;
        height : 100%;
        background-color: ${color};
        @media only screen and (min-width: ${theme.breakpoints.md}) { 
            max-width :${theme.cardSizes.width[initialWidth]};
        }

      
    `,
]);

export const CardHeading = styled.h3`
    margin-bottom: 2.5rem;
    margin-top: unset;
    text-align: left;
    font-size: ${(props) => props.theme.fontSize.h3};
`;

export const CardContent = styled.div`
    flex-grow : 1;
    height : 100%;
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

function Card({ color, initialWidth, title, text, buttonText, linkTo, reverted, className }: Card) {
    return (
        <CardWrapper className={className} initialWidth={initialWidth} color={color} reverted={reverted}>
            <CardContent>
                <CardText>
                    <CardHeading>{title}</CardHeading>
                    <CardParagraph>{text}</CardParagraph>
                </CardText>
               
                    <Button linkTo={linkTo} text={buttonText} small={initialWidth === CardSize.Small}></Button>
               
            </CardContent>
        </CardWrapper>
    );
}

export default Card;
