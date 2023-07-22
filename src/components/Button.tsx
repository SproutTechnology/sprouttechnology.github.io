import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { css, useTheme } from '@emotion/react'

interface Props {
    small: Boolean;
    text?: String;
    linkTo?: string;
}

const baseStyle = () => {
    const theme = useTheme();
    return css`
        cursor: pointer;
        width: 100%;
        height: 3.5rem;
        color: white;
        background-color: ${theme.backgroundColors.charcoal};
        border-radius: 50px;
            border: none;
            font-size: ${theme.fontSize.button};
            letter-spacing: 1px;
            &:hover {
                background-color: ${theme.buttonColors.hover};
            }
    `
}

const StyledButton = styled.button<Props>`${baseStyle}`;
const ButtonStyledLink = styled(Link)`
    ${baseStyle}    
    display : flex;
    align-items : center;
    justify-content : center;
    text-decoration : none;
`



export const AnchorButton = StyledButton.withComponent("a");

const Button = ({ small, text, linkTo }: Props) => {
    return linkTo ?
        <ButtonStyledLink to={linkTo}> {text || "Read more"}</ButtonStyledLink>
        : <StyledButton small={small}>
            {text || "Read more"}
        </StyledButton>
}

export default Button;
