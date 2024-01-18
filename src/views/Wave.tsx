import ViewContainer from "../components/ViewContainer";
import Intro from '../components/Intro/Index';
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";

interface Props {
    setIntroVisited: (hasBeenVisited: boolean) => void;
}


function Wave({ setIntroVisited }: Props) {
    const navigate = useNavigate();

    return (
        <ViewContainer dismissOnClick onClickHandler={
            () => {
                setIntroVisited(true);
                navigate("#Home");
            }}>
            <Intro />
        </ViewContainer>
    );
}


export default Wave;

