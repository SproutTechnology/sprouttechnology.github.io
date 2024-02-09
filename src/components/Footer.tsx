import styled from "@emotion/styled";
import { mq } from "../theme";

function Footer() {
    return (
        <StyledFooter>
            <Link href="#Home">init_start_over_</Link>
            <Logo src="/heading.svg" />
        </StyledFooter>
    );
}

export default Footer;

const StyledFooter = styled.footer`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    background-color: #000;
    padding: 2rem;

    ${mq["sm"]} {
        padding: 3rem;
    }
`;

const Logo = styled.img`
    width: 146px;
`;

const Link = styled.a`
    all: unset;
    color: #fff;
    font-family: ${(props) => props.theme.fontFamily.azeretMono};
    font-size: ${(props) => props.theme.fontSize.sm};
    line-height: ${(props) => props.theme.lineHeight.sm};

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;
