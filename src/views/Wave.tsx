import ViewContainer from "../components/ViewContainer";

interface Props {
    setIntroVisited : (hasBeenVisited : boolean) => void;
}

function Wave({setIntroVisited} : Props) {
    return (
        <ViewContainer dismissOnClick onClickHandler={()=>setIntroVisited(true)}>
            <div style={{display : 'flex', height : '100svh', justifyContent : 'center', alignItems : 'center'}}>
                <div style={{fontSize : "clamp(2rem, 10vw, 8rem)", padding : '2rem', textAlign : 'center'}}>Im a wave dissapearing when clicked or scrolled pass 100vh</div>
            </div>
        </ViewContainer>
    );
}


export default Wave;

