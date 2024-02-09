import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { mq } from "../theme";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Case {
    img: string;
    text: string;
}

function CaseBanner() {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    function handleModal(index: number) {
        const newIndex = selectedIndex === index ? -1 : index;

        const rootElement = document.documentElement;

        if (newIndex === -1) {
            rootElement.classList.remove("fullscreen-modal");
        } else {
            rootElement.classList.add("fullscreen-modal");
        }
        setSelectedIndex(newIndex);
    }

    const cases: Case[] = [
        {
            img: "https://images.unsplash.com/photo-1497215641119-bbe6d71ebaae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b2ZmaWNlfGVufDB8MXwwfHx8Mg%3D%3D",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos corporis vel?",
        },
        {
            img: "https://images.unsplash.com/photo-1630332458839-5ece43363621?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbGxlYWd1ZXN8ZW58MHwxfDB8fHwy",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos corporis vel?",
        },
        {
            img: "https://images.unsplash.com/photo-1591638212063-c2f69701a931?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0YWlyc3xlbnwwfDF8MHx8fDI%3D",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos corporis vel?",
        },
        {
            img: "https://images.unsplash.com/photo-1462392627162-2baa2b3518a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3NoZWxmfGVufDB8MXwwfHx8Mg%3D%3D",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos corporis vel?",
        },
        {
            img: "https://images.unsplash.com/photo-1588483977150-9c2127ab7bcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmV8ZW58MHwxfDB8fHwy",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos corporis vel?",
        },
    ];
    return (
        <Banner>
            <Global
                styles={css`
                    html.fullscreen-modal {
                        height: 100%;
                        overflow: hidden;

                        ${mq["sm"]} {
                            height: auto;
                            overflow: visible;
                        }
                    }
                `}
            />
            <StyledSwiper
                modules={[Navigation, Keyboard]}
                slidesPerView={1}
                navigation
                keyboard={{ enabled: true }}
                breakpoints={{ 640: { slidesPerView: 3 } }}
            >
                {cases.map((item, idx) => (
                    <SwiperSlide
                        key={item.img}
                        onClick={() => {
                            handleModal(idx);
                        }}
                    >
                        <BannerImage src={item.img}></BannerImage>

                        <BannerPopup $selected={selectedIndex === idx}>
                            <PopupContent>
                                <PopupImage src={item.img}></PopupImage>
                                <PopupText>{item.text}</PopupText>
                            </PopupContent>
                        </BannerPopup>
                    </SwiperSlide>
                ))}
            </StyledSwiper>
            {selectedIndex !== -1 &&
                createPortal(
                    <MobilePopup>
                        <CloseButton
                            onClick={() => {
                                handleModal(-1);
                            }}
                        ></CloseButton>
                        <PopupContent>
                            <PopupImage src={cases[selectedIndex].img}></PopupImage>
                            <PopupText>{cases[selectedIndex].text}</PopupText>
                        </PopupContent>
                    </MobilePopup>,
                    document.body,
                )}
        </Banner>
    );
}

const CloseButton = styled.div`
    display: flex;
    justify-content: center;
    place-items: center;
    margin-bottom: ${(props) => props.theme.spacing.xs};
    cursor: pointer;
    border: 1px solid black;
    color: black;
    width: 2rem;
    height: 2rem;
    background-color: #fff;

    &::after {
        content: "X";
    }
`;

const MobilePopup = styled.div`
    position: fixed;
    display: flex;
    overflow: scroll;

    /* 
        overflow: hidden auto;
        -ms-overflow-style: none;
        scrollbar-width: none; 
        &::-webkit-scrollbar {
            display: none; 
        }
    */

    place-content: center flex-start;
    align-items: flex-end;
    flex-direction: column;
    z-index: 10;
    padding: ${({ theme }) => theme.spacing.xs};
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 70%);

    ${mq["sm"]} {
        display: none;
    }
`;

const StyledSwiper = styled(Swiper)`
    --swiper-navigation-sides-offset: 0px;

    overflow: clip visible;
    margin-left: ${({ theme }) => theme.spacing.xs};
    margin-right: ${({ theme }) => theme.spacing.xs};

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

    & .swiper-button-prev::after,
    & .swiper-button-next::after {
        font-size: ${({ theme }) => theme.fontSize.xs};
    }

    ${mq["sm"]} {
        margin: 0;

        & .swiper-button-prev {
            margin-left: ${({ theme }) => theme.spacing.xs};
        }

        & .swiper-button-next {
            margin-right: ${({ theme }) => theme.spacing.xs};
        }
    }
`;

const Banner = styled.div`
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 5rem;

    ${mq["sm"]} {
        /* max-height : 30svh; */
        flex-wrap: nowrap;
    }
`;

const BannerImage = styled.img`
    width: 100%;
    height: auto;
    min-width: 0;
    object-fit: cover;
    ${mq["sm"]} {
        max-height: 20svh;
    }
`;

const BannerPopup = styled.div<{ $selected?: boolean }>`
    width: 100%;
    height: 100%;
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
        display: ${(props) => (props.$selected ? "block" : "none")};
        position: absolute;
        height: auto;
        bottom: 0;
        top: auto;
        background-color: transparent;
        padding: 0;
        scale: 1;
    }
`;
const PopupContent = styled.div`
    border: 1px solid black;
    background-color: #fff;
    display: flex;
    flex-direction: column;
`;

const PopupImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;

    ${mq["sm"]} {
        aspect-ratio: 4/3;
        padding-top: ${({ theme }) => theme.spacing.sm};
        padding-left: ${({ theme }) => theme.spacing.sm};
        padding-right: ${({ theme }) => theme.spacing.sm};
    }
`;
const PopupText = styled.span`
    width: 100%;
    height: auto;
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSize.xs};
`;

export default CaseBanner;
