import styled from "@emotion/styled";
import { mq } from "../theme";

function ImageBanner() {
    const images = [
        "https://images.unsplash.com/photo-1588483977150-9c2127ab7bcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmV8ZW58MHwxfDB8fHwy",
        "https://images.unsplash.com/photo-1462392627162-2baa2b3518a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3NoZWxmfGVufDB8MXwwfHx8Mg%3D%3D",
        "https://images.unsplash.com/photo-1591638212063-c2f69701a931?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0YWlyc3xlbnwwfDF8MHx8fDI%3D",
        "https://images.unsplash.com/photo-1630332458839-5ece43363621?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbGxlYWd1ZXN8ZW58MHwxfDB8fHwy",
        "https://images.unsplash.com/photo-1497215641119-bbe6d71ebaae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b2ZmaWNlfGVufDB8MXwwfHx8Mg%3D%3D",
    ];
    return (
        <Banner>
            {images.map((img) => (
                <BannerImage key={img} src={img}></BannerImage>
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
