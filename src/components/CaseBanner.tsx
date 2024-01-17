
import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import theme, { mq } from "../theme";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface Case {
    img: string,
    text: string
}

function CaseBanner() {

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const cases: Case[] = [
        {
            img: "https://images.unsplash.com/photo-1497215641119-bbe6d71ebaae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b2ZmaWNlfGVufDB8MXwwfHx8Mg%3D%3D",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos corporis vel?"
        },
        {
            img: "https://images.unsplash.com/photo-1630332458839-5ece43363621?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbGxlYWd1ZXN8ZW58MHwxfDB8fHwy",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos corporis vel?"
        },
        {
            img: "https://images.unsplash.com/photo-1591638212063-c2f69701a931?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0YWlyc3xlbnwwfDF8MHx8fDI%3D",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos corporis vel?"
        },
        {
            img: "https://images.unsplash.com/photo-1462392627162-2baa2b3518a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3NoZWxmfGVufDB8MXwwfHx8Mg%3D%3D",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos corporis vel?"
        },
        {
            img: "https://images.unsplash.com/photo-1588483977150-9c2127ab7bcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmV8ZW58MHwxfDB8fHwy",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos corporis vel?"
        }
    ]
    return (
        <Banner>
            <StyledSwiper
                modules={[Navigation, Keyboard]}
                slidesPerView={1}

                navigation
                keyboard={{ enabled: true }}
                breakpoints={{ 640: { slidesPerView: 3 } }}
            >
                {cases.map((item, idx) =>
                    <SwiperSlide key={item.img} onClick={() => { setSelectedIndex(selectedIndex === idx ? -1 : idx) }}>
                        <BannerImage src={item.img}></BannerImage>

                        <BannerPopup $selected={selectedIndex === idx}>
                            <PopupContent>
                                <PopupImage src={item.img}></PopupImage>
                                <PopupText>
                                    {item.text}
                                </PopupText>
                            </PopupContent>
                        </BannerPopup>
                    </SwiperSlide>

                )}
            </StyledSwiper>
            {selectedIndex !== -1 && createPortal(
                <MobilePopup>
                    <PopupContent>
                        <CloseButton onClick={() => { setSelectedIndex(-1) }}></CloseButton>
                        <PopupImage src={cases[selectedIndex].img}></PopupImage>
                        <PopupText>
                            {cases[selectedIndex].text}
                        </PopupText>
                    </PopupContent>
                </MobilePopup>,
                document.body)
            }
        </Banner>
    );
}

const CloseButton = styled.div`
    display: flex;
    float: right;
    justify-content: center;
    justify-items: center;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;

    border: 1px solid black;
    color: black;
    width: 2rem;
    height: 2rem;

    &:after {
        content: 'X';
    }
`

const MobilePopup = styled.div`
    position: fixed;
    display : flex;

    justify-content: center;
    align-items: center;
    align-content: center;

    flex-direction : column;
    z-index: 10;
    padding: 1rem;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;

    background-color: #fff;

    ${mq["sm"]} {
        display: none;
    };
`

const StyledSwiper = styled(Swiper)`
    ${({ theme }) => `
    overflow-x: clip;
    overflow-y: visible;

    &.swiper-backface-hidden .swiper-slide {
        transform: none;
    }

    & .swiper-button-prev,
    & .swiper-button-next {
        top: auto;
        bottom: -3rem;
        border: 1px solid black;
        color: black;
        width: 2rem;
        height: 2rem;
    }
    
    & .swiper-button-prev:after,
    & .swiper-button-next:after {
        font-size: 1rem;
    }
    `}
`

const Banner = styled.div`
    ${({ theme }) => `
    width : 100%;
    max-width : 100%;
    display : flex;
    flex-wrap : wrap;
    padding-bottom: 5rem;
    
    ${mq["sm"]} {
        /*max-height : 30svh;*/
       
        flex-wrap : nowrap;
    };
    `}
`

const BannerImage = styled.img`
    width : 100%;
    height : auto;
    min-width : 0px;
    /*z-index: 1;*/
    /*max-height : 20svh;*/
    object-fit : cover;
    ${mq["sm"]} {
        max-height : 30svh;
       
        flex-wrap : nowrap;
    };
`

const BannerPopup = styled.div<{ $selected?: boolean; }>`
    width : 100%;
    height : 100%;
    position: absolute;
    bottom: auto;
    top: 0;
    left: 0;
    padding: 10px;
    transition: all 1s ease-out;
    background-color: #fff;
    z-index: 10;
    display: none;

    ${mq["sm"]} {
        display: ${props => props.$selected ? "block" : "none"};
        position: absolute;
        height : auto;
        bottom: 0;
        top: auto;
        background-color: transparent;
        padding: 0;
        scale: 1.05;
    };
`
const PopupContent = styled.div`
    border: 1px solid black;
    background-color: #fff;
    padding: 10px;
`

const PopupImage = styled.img`
    width : 100%;
    height : auto;
    object-fit: cover;    

    ${mq["sm"]} {
        aspect-ratio: 4/3;
    };

`
const PopupText = styled.span`
    width : 100%;
    height : auto;

    
`


export default CaseBanner;
