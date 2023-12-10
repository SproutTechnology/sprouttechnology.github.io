
import styled from "@emotion/styled";

function ImageBanner() {
    const images = [
        "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1515442261605-65987783cb6a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1536411396596-afed9fa3c1b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3NoZWxmfGVufDB8fDB8fHwy",
        "https://images.unsplash.com/photo-1526573059328-179b147e1b42?q=80&w=2005&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1609270460854-e8ea8c0b591f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29sbGVndWVzfGVufDB8fDB8fHwy"
    ]
    return (
        <Banner>
           {images.map((img)=> <BannerImage src={img}></BannerImage>)}
        </Banner>
    );
}

const Banner = styled.div`
    ${({ theme }) => `
    width : 100%;
    max-width : 100%;
    display : flex;
    height : 300px;
    margin-bottom : ${theme.spacing.md}
    `}
`

const BannerImage = styled.img`
    width : 100%;
    height : auto;
    min-width : 0px;
`

export default ImageBanner;
