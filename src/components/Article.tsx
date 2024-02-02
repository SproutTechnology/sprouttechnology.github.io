import styled from "@emotion/styled";
import { ReactNode } from "react";
import { mq } from "../theme";

interface Props {
    children: ReactNode;
    headingRight?: boolean;
    heading: string;
}

function Article({ heading, children, headingRight = false }: Props) {
    return (
        <StyledArticle headingRight={headingRight}>
            {headingRight ? <StyledHeadingRight>{heading}</StyledHeadingRight> : <StyledHeadingLeft>{heading}</StyledHeadingLeft>}
            <article>{children}</article>
        </StyledArticle>
    );
}

export default Article;

const StyledHeadingLeft = styled.h2`
    ${({ theme }) => `
        font-size: ${theme.fontSize.md};
        line-height: ${theme.lineHeight.md};
        color: #000;
        font-weight: 700;
    `}
`;
const StyledHeadingRight = styled.h2`
    ${({ theme }) => `
        font-size: ${theme.fontSize.md};
        line-height: ${theme.lineHeight.md};
        color: #000;
        font-weight: 700;
        text-align: right;
    `}
`;

const StyledArticle = styled.div<{ headingRight: boolean }>`
    ${({ theme, headingRight }) => `
    min-width : 250px;
    flex-basis : 40%;
    flex-grow : 2;
    display : flex;
    flex-direction : ${headingRight ? "column-reverse" : "column"};
    gap : 2rem;

    ${mq["sm"]} { 
        gap : 5rem;
        flex-direction : column;
    };

    & * {
        font-family : ${theme.fontFamily.azeretMono};
        font-size : ${theme.fontSize.sm};
        line-height : ${theme.lineHeight.sm};
        color: ${theme.colors.oldTypewriter};
        & > em {
            font-weight : 800;
            font-weight : bold;
            color: ${theme.colors.nightSky};
        }
    }
    `}
`;
