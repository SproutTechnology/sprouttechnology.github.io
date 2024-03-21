import styled from "@emotion/styled";
import { ReactNode } from "react";
import { mq } from "../theme";

interface Props {
    children: ReactNode;
    headingRight?: boolean;
    heading: string;
    invertedColors?: boolean;
}

function Article({ heading, children, headingRight = false, invertedColors = false }: Props) {
    return (
        <StyledArticle headingRight={headingRight} invertedColors={invertedColors}>
            {headingRight ? (
                <StyledHeadingRight invertedColors={invertedColors}>{heading}</StyledHeadingRight>
            ) : (
                <StyledHeadingLeft invertedColors={invertedColors}>{heading}</StyledHeadingLeft>
            )}
            <article>{children}</article>
        </StyledArticle>
    );
}

export default Article;

const StyledHeadingLeft = styled.h2<{ invertedColors: boolean }>`
    ${({ theme, invertedColors }) => `
        font-size: ${theme.fontSize.md};
        line-height: ${theme.lineHeight.md};
        color: ${invertedColors ? "#fff" : "#000"};
        font-weight: 700;
    `}
`;
const StyledHeadingRight = styled.h2<{ invertedColors: boolean }>`
    ${({ theme, invertedColors }) => `
        font-size: ${theme.fontSize.md};
        line-height: ${theme.lineHeight.md};
        color: ${invertedColors ? "#fff" : "#000"};
        font-weight: 700;
        text-align: right;
    `}
`;

const StyledArticle = styled.div<{ headingRight: boolean; invertedColors: boolean }>`
    ${({ theme, headingRight, invertedColors }) => `
    min-width : 250px;
    flex-basis : 40%;
    flex-grow : 2;
    display : flex;
    flex-direction : ${headingRight ? "column-reverse" : "column"};
    gap : 2rem;
    color: ${invertedColors ? "#fff" : theme.colors.oldTypewriter};
    font-size : ${theme.fontSize.sm};
    line-height : ${theme.lineHeight.sm};

    ${mq["sm"]} { 
        gap : 5rem;
        flex-direction : column;
    };

    & * {
        font-family : ${theme.fontFamily.azeretMono};
        & > em {
            font-weight : 800;
            font-weight : bold;
            color: ${theme.colors.nightSky};
        }
    }
    `}
`;
