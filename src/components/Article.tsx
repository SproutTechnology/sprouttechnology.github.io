

import styled from "@emotion/styled";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    heading : string;
}

function Article({heading, children} : Props) {
    return (
       
            <StyledArticle>
                <StyledArticleHeader>{heading}</StyledArticleHeader>
                <article>{children}</article>
            </StyledArticle>
        
    );
}


export default Article;

const StyledArticleHeader = styled.h2`
    font-weight : 700;
`

const StyledArticle = styled.div`
${({ theme }) => `
    min-width : 250px;
    flex-basis : 40%;
    flex-grow : 2;
    display : flex;
    flex-direction : column;
    gap : 5rem;
    & * {
        font-size : ${theme.fontSize.sm};
        font-weight : 400;
        font-family : ${theme.fontFamily.azeretMono};
        & > em {
            font-weight : bold;
        }
    }
    `}
`
