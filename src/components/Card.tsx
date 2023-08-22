import styled from "@emotion/styled";
import CardSize from "../enums/CardSize";
import { css } from "@emotion/react";
import NewButton from "./NewButton";
import { useNavigate } from "react-router-dom";

interface StyledCard {
    color: string;
    initialWidth: CardSize;
}

interface Card {
    color: string;
    initialWidth: CardSize;
    className?: string;
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
        width: 100%;
        height: 100%;
        background-color: ${color};

        @media only screen and (min-width: ${theme.breakpoints.sm}) {
            max-width: ${theme.cardSizes.width[initialWidth]};
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
    flex-grow: 1;
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

function Card({ color, initialWidth, title, text, buttonText, linkTo, reverted, className }: Card) {
    const navigate = useNavigate();

    return (
        <CardWrapper className={className} initialWidth={initialWidth} color={color} reverted={reverted}>
            <CardContent>
                <div>
                    <CardHeading>{title}</CardHeading>
                    <CardParagraph>{text}</CardParagraph>
                </div>
                <NewButton label={buttonText} onClick={() => navigate(linkTo)} />
            </CardContent>
        </CardWrapper>
    );
}

export default Card;
