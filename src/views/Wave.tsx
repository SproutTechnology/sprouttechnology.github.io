import styled from "@emotion/styled";
import ViewContainer from "../components/ViewContainer";
import Intro from "../components/Intro/Index";
import { useNavigate } from "react-router-dom";
import Cursor from "@components/Cursor";

interface Props {
    setIntroVisited: (hasBeenVisited: boolean) => void;
}

function Wave({ setIntroVisited }: Props) {
    const navigate = useNavigate();

    return (
        <ViewContainer
            dismissOnClick
            onClickHandler={() => {
                setIntroVisited(true);
                navigate("#Home");
            }}
        >
            <Enter>
                <Link>
                    &gt;Enter<Cursor></Cursor>
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
    color: #fff;
    z-index: 10;
`;

const Link = styled.div`
    cursor: pointer;
`;
