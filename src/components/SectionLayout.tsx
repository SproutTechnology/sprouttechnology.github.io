import styled from "@emotion/styled";
import { ReactNode } from "react";
import { mq } from "../theme";

interface Props {
    children: ReactNode;
    desktopBackgroundUrl?: string;
    mobileBackgroundUrl?: string;
    bgColor?: string;
    fullWidthContent?: ReactNode;
    className?: string;
    isHero?: boolean;
}

function SectionLayout({
    children,
    desktopBackgroundUrl = "",
    mobileBackgroundUrl = "",
    bgColor = "black",
    fullWidthContent,
    className,
    isHero = false,
}: Props) {
    return (
        <BackgroundDiv bgColor={bgColor} mobileBackgroundUrl={mobileBackgroundUrl} desktopBackgroundUrl={desktopBackgroundUrl} className={className}>
            <Content isHero={isHero}>{children}</Content>
            {fullWidthContent}
        </BackgroundDiv>
    );
}

export default SectionLayout;

interface StyledHeaderProps {
    desktopBackgroundUrl: string;
    mobileBackgroundUrl: string;
    bgColor?: string;
}

const Content = styled.div<{ isHero?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-basis: 100%;
    min-height: 0;
    margin-top: ${({ theme }) => theme.spacing.lg};
    max-width: 1480px;

    margin-left: ${({ theme }) => theme.spacing.sm};
    margin-right: ${({ theme }) => theme.spacing.sm};
    width: calc(100% - ${({ theme }) => theme.spacing.sm});

    ${mq["xs"]} {
        margin-left: ${({ theme }) => theme.spacing.md};
        margin-right: ${({ theme }) => theme.spacing.md};
        width: calc(100% - ${({ theme }) => theme.spacing.md});
    }

    ${mq["sm"]} {
        margin-top: calc(${({ theme }) => theme.spacing.xl} * 1.5);
        margin-left: ${({ theme }) => theme.spacing.lg};
        margin-right: ${({ theme }) => theme.spacing.lg};
        width: calc(100% - ${({ theme }) => theme.spacing.lg});
    }

    ${mq["lg"]} {
        margin-top: calc(${({ theme }) => theme.spacing.xl} * 1.5);
        margin-left: ${({ theme }) => theme.spacing.xl};
        margin-right: ${({ theme }) => theme.spacing.xl};
        width: calc(100% - ${({ theme }) => theme.spacing.xl});
    }
    ${({ isHero }) =>
        !isHero &&
        `
        margin: 0;
    `}
`;

const BackgroundDiv = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-repeat: no-repeat;
    background-size: 100% 40svh;
    min-height: 100svh;
    background-position-x: center;
    background-color: ${(props: StyledHeaderProps) => `${props.bgColor}`};
    background-image: ${(props: StyledHeaderProps) => `url(${props.mobileBackgroundUrl})`};
    background-size: 65vh;

    ${mq["sm"]} {
        height: 1000px;
        min-height: 100vh;
        background-size: auto 100%;
        background-image: ${(props: StyledHeaderProps) => `url(${props.desktopBackgroundUrl})`};
        background-position: 50vw 0;
    }

    @media screen and (min-width: 500px) and (max-height: 500px) {
        background-image: none;
    }
`;
