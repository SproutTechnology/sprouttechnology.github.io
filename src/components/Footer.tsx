import styled from "@emotion/styled";
import { mq } from "../theme";
import Cursor from "./Cursor";

function Footer() {
    return (
        <StyledFooter>
            <Link href="#Home">
                &gt;init_restart
                <Cursor />
            </Link>
            <Logo src="/heading.svg" />
        </StyledFooter>
    );
}

export default Footer;

const StyledFooter = styled.footer(
    ({ theme }) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000;
    gap: ${theme.spacing.lg};
    padding-bottom: ${theme.spacing.lg};

    ${mq["xs"]} {
        padding: ${theme.spacing.md};
    }

    ${mq["sm"]} {
        padding: ${theme.spacing.md};
        flex-direction: row;
        justify-content: space-between;
    }

    ${mq["lg"]} {
        padding: ${theme.spacing.md} ${theme.spacing.lg};
    }
`,
);

const Logo = styled.img`
    width: 146px;
`;

const Link = styled.a`
    all: unset;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.blueWhale};
    font-family: ${({ theme }) => theme.fontFamily.azeretMono};
    font-size: ${({ theme }) => theme.fontSize.sm};
    line-height: ${({ theme }) => theme.lineHeight.sm};

    &:hover {
        text-decoration: underline;
    }

    &:visited {
        color: ${({ theme }) => theme.colors.blueWhale};
    }
`;
