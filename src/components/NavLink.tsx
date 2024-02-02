import styled from "@emotion/styled";
import { mq } from "../theme";

interface Props {
    id: string;
    title: string;
    subtitle?: string;
    text?: string;
}

function NavLink({ id, title, subtitle, text }: Props) {
    return (
        <Link href={id}>
            <em>{title}</em>
            {subtitle && <span>{subtitle}</span>}
            {text && <span>{text}</span>}
        </Link>
    );
}

export default NavLink;

const Link = styled.a`
    all: unset;
    display: flex;
    align-content: center;
    color: ${(props) => props.theme.colors.summerCurtains};
    text-transform: uppercase;
    flex-direction: column;

    [open] & {
        height: 5rem;
    }

    ${mq["sm"]} {
        height: 4rem;
    }

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    & > em {
        font-size: ${(props) => props.theme.fontSize.md};
        font-style: normal;
    }

    & > span {
        font-size: ${(props) => props.theme.fontSize.xxs};
    }
`;
