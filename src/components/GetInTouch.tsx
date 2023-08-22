import { Gap10 } from "./helpers/Gap";

function GetInTouch() {
    return (
        <>
            <Gap10 />

            <div className="animation-wrap rellax" data-rellax-percentage="0.5">
                <div className="text--karaoke" style={{ textAlign: "center" }} data-scroll="out" data-splitting="">
                    info@wearesprout.se
                    <br />
                    +46777111222
                    <br />
                    <br />
                    Drottninggatan 29
                    <br />
                    411 14 Göteborg
                </div>
            </div>
        </>
    );
}

export default GetInTouch;
