import styled from "@emotion/styled";
import { mq } from "../theme";

type ImageObj = {
    url: string;
    alt: string;
};
function ImageBanner() {
    const images: ImageObj[] = [
        { url: "/main-floor-cut.png", alt: "The main office floor with desktop and people talking." },
        { url: "/coffee-n-rooftops.png", alt: "Person drinking coffee looking over the rooftops at the top of the office." },
        { url: "/meeting-room-cut.png", alt: "People in a meeting room with laptops." },
        { url: "/coffee-n-laptop.png", alt: "laptop and black coffee on marble table." },
        { url: "/tiger-image.png", alt: "wall painting in the hallway of the office, displaying a tiger and parts of the sprout logo." },
    ];
    return (
        <Banner>
            {images.map(({ url, alt }, i) => (
                <BannerImage key={alt + i} alt={alt} src={url}></BannerImage>
            ))}
        </Banner>
    );
}

const Banner = styled.div`
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;

    ${mq["sm"]} {
        max-height: 30svh;
        flex-wrap: nowrap;
    }
`;

const BannerImage = styled.img`
    width: 100%;
    height: auto;
    min-width: 0;
    max-height: 20svh;
    object-fit: cover;
    ${mq["sm"]} {
        max-height: 30svh;
        flex-wrap: nowrap;
    }
`;

export default ImageBanner;
