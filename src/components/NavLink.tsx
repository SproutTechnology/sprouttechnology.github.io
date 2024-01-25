import styled from "@emotion/styled";

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
    height: 6rem;
    display: flex;
    align-content: center;
    color: ${(props) => props.theme.colors.summerCurtains};
    text-transform: uppercase;

    flex-direction: column;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    & > em {
        font-size: 2.5rem;
        font-style: normal;
    }

    & > span {
        font-size: 0.5rem;
    }
`;
