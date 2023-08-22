import styled from "@emotion/styled";

const Introduction = styled.div<{ height: string }>`
    z-index: 14;
    color: #e5dbd1;
    text-align: center;
    height: ${(props) => props.height};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1.5rem;
`;

function OneLine({ label, height = "70vh" }: { label: string; height?: string }) {
    return (
        <Introduction height={height}>
            <div className="rellax" data-rellax-percentage="0.5">
                <div className="animation-wrap">
                    <div className="text--karaoke" data-scroll="out" data-splitting="">
                        {label}
                    </div>
                </div>
            </div>
        </Introduction>
    );
}

export default OneLine;
