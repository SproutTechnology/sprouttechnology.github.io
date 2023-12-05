

import styled from "@emotion/styled";


interface Props {
    heading : string;
    text : string;
}

function Article({heading, text} : Props) {
    return (
       
            <StyledArticle>
                <StyledArticleHeader>{heading}</StyledArticleHeader>
                <article>{text}</article>
            </StyledArticle>
        
    );
}


export default Article;

const StyledArticleHeader = styled.h2`
    font-weight : bolder;
    
`

const StyledArticle = styled.div`
    display : flex;
    flex-direction : column;
    gap : 5rem;
    & > * {
        font-family : ${(props) => props.theme.link.font};
    }
`
