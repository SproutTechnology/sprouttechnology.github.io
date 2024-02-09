import styled from "@emotion/styled";
import { mq } from "../theme";

function Footer() {
    return (
        <StyledFooter>
            <Link href="#Home">&gt;init_start_over_</Link>
            <Logo src="/heading.svg" />
        </StyledFooter>
    );
}

export default Footer;

const StyledFooter = styled.footer`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000;
    padding: 2rem;
    gap: ${({ theme }) => theme.spacing.lg};
    padding-left: ${({ theme }) => theme.spacing.md};
    padding-right: ${({ theme }) => theme.spacing.md};

    ${mq["sm"]} {
        padding: 3rem;
        flex-direction: row;
        justify-content: space-between;
        padding-left: ${({ theme }) => theme.spacing.lg};
        padding-right: ${({ theme }) => theme.spacing.lg};
    }

    ${mq["lg"]} {
        padding-left: ${({ theme }) => theme.spacing.xl};
        padding-right: ${({ theme }) => theme.spacing.xl};
    }
`;

const Logo = styled.img`
    width: 146px;
`;

const Link = styled.a`
    all: unset;
    cursor: pointer;
    color: #fff;
    font-family: ${({ theme }) => theme.fontFamily.azeretMono};
    font-size: ${({ theme }) => theme.fontSize.sm};
    line-height: ${({ theme }) => theme.lineHeight.sm};

    &:hover {
        text-decoration: underline;
    }
`;
