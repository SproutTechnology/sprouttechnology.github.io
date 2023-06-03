import styled from "@emotion/styled";
interface Props {
    small : Boolean,
    text? : String
}
const StyledButton = styled.button`
    cursor : pointer;
    width : ${(props : Props)=> props.small ? '5rem' : '12.5rem' };
    height : 3.5rem;
    color : white;
    background-color : ${props => props.theme.backgroundColors.charcoal};
    border-radius : 50px;
    border : none;
    font-size : ${props => props.theme.fontSize.button};
    letter-spacing : 1px;
    &:hover {
        background-color:  ${(props)=> props.theme.buttonColors.hover };
    }
    
`

const Button = ({ small, text } : Props) => (
    <StyledButton small={small}>
        {text || "Read more"}
    </StyledButton>
)

export default Button;