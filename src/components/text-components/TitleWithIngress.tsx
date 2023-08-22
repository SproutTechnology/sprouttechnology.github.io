import styled from "@emotion/styled";
import React from "react";
import { Gap5 } from "../helpers/Gap";
import ArrowLeft from "../icons/ArrowLeft";
import { Link } from "react-router-dom";
import LinkToPage from "../../enums/LinkToPage";

interface Props {
    title: string;
    children: React.ReactNode;
    canGoBack?: boolean;
    color?: string;
}

function TitleWithIngress({ title, children, canGoBack = false, color = "white" }: Props) {
    return (
        <ContentInner color={color}>
            {canGoBack && (
                <Link to={LinkToPage.StartPage}>
                    <ArrowLeft />
                </Link>
            )}

            <Title>{title}</Title>
            <BodyTextHolder>
                {children}
                <Gap5 />
            </BodyTextHolder>
        </ContentInner>
    );
}

export default TitleWithIngress;

const ContentInner = styled.div`
    max-width: 40rem;
    margin: auto;
    color: ${(props) => props.color};
`;

const Title = styled.h1`
    font-size: ${(props) => props.theme.fontSize.h1};
    color: ${(props) => props.color};
    margin: unset;
`;

const BodyTextHolder = styled.div`
    font-size: ${(props) => props.theme.fontSize.p};

    @media (min-width: 768px) {
        padding-left: clamp(1rem, 6vw, 8rem);
    }
`;
