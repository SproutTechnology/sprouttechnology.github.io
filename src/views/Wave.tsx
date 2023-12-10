import ViewContainer from "../components/ViewContainer";

interface Props {
    setIntroVisited : (hasBeenVisited : boolean) => void;
}

function Wave({setIntroVisited} : Props) {
    return (
        <ViewContainer dismissOnClick onClickHandler={()=>setIntroVisited(true)}>
            <div style={{fontSize : "10rem"}}>REPLACE ME WITH WAVE</div>
        </ViewContainer>
    );
}


export default Wave;

