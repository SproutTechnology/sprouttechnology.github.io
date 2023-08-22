import styled from "@emotion/styled";

interface Props {
    image: string;
}

function HeroSubPage({ image }: Props) {
    return (
        <Relative>
            <Image src={image} />

            <AbsoluteBottom>
                <Image src={"/curve_top_transparent.svg"} />
            </AbsoluteBottom>
        </Relative>
    );
}

const Relative = styled.div`
    position: relative;
    background-color: ${(props) => props.theme.backgroundColors.charcoal};
`;

const AbsoluteBottom = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default HeroSubPage;
