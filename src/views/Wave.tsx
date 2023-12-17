import ViewContainer from "../components/ViewContainer";
import Intro from '../components/Intro/Index';
import {Suspense} from "react";

interface Props {
    setIntroVisited : (hasBeenVisited : boolean) => void;
}

function Wave({setIntroVisited} : Props) {
    return (
        <ViewContainer dismissOnClick onClickHandler={()=>setIntroVisited(true)}>
            <Intro/>
        </ViewContainer>
    );
}


export default Wave;

