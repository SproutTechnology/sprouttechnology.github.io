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
    const headingProps = { invertedColors, hasContent: heading.trim().length > 0 };

    return (
        <StyledArticle headingRight={headingRight} invertedColors={invertedColors}>
            {headingRight ? (
                <StyledHeadingRight {...headingProps}>{heading}</StyledHeadingRight>
            ) : (
                <StyledHeadingLeft {...headingProps}>{heading}</StyledHeadingLeft>
            )}
            <article>{children}</article>
        </StyledArticle>
    );
}

export default Article;

type HeadingProps = { invertedColors: boolean; hasContent: boolean };
const StyledHeadingLeft = styled.h2<HeadingProps>`
    ${({ theme, invertedColors }) => `
        color: ${invertedColors ? "#fff" : theme.colors.blueWhale};
        font-family: ${theme.fontFamily.bayon};
        line-height: ${theme.lineHeight.md};
        font-size: ${theme.fontSize.lg};

        margin-bottom: 0;
        margin-top: 1.66em;
    `}

    ${({ hasContent }) =>
        !hasContent &&
        `
            height: 0;

            ${mq["sm"]} { 
                height: auto;
            };
        `}
`;
const StyledHeadingRight = styled(StyledHeadingLeft)<HeadingProps>`
    text-align: right;
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
        flex-direction : column;
    };

    & *:not(h2) {
        font-family : ${theme.fontFamily.azeretMono};
        & > em {
            font-weight : 800;
            font-weight : bold;
            color: ${theme.colors.nightSky};
        }
    }
    `}
`;
