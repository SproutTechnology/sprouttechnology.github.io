import { useEffect } from "react";
import styled from "@emotion/styled";
import ViewContainer from "../components/ViewContainer";
import { Intro } from "../components/Intro/Index";
import { useNavigate } from "react-router-dom";
import Cursor from "@components/Cursor";

function Wave() {
    const navigate = useNavigate();

    const proceed = () => {
        // setIntroVisited(true);
        navigate("#Home");
    };

    useEffect(() => {
        const onKeyUp = (e: { key: string }) => {
            if (e.key === "Enter") proceed();
        };

        window.addEventListener("keyup", onKeyUp);

        return () => window.removeEventListener("keyup", onKeyUp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ViewContainer dismissOnClick onClickHandler={proceed}>
            <Enter>
                <Link>
                    &gt;enter
                    <Cursor />
                </Link>
            </Enter>
            <Intro />
        </ViewContainer>
    );
}

export default Wave;

const Enter = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.blueWhale};
    z-index: 10;
`;

const Link = styled.div`
    cursor: pointer;
`;
