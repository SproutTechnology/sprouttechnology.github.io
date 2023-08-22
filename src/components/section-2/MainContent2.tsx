import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import Card from "../Card";
import CardSize from "../../enums/CardSize";
import Colors from "../../enums/Colors";
import LinkToPage from "../../enums/LinkToPage";

function MainContent2() {
    return (
        <Wrapper>
            <ul className="gridwrapper">
                <li className="item-a">
                    <Card
                        initialWidth={CardSize.Large}
                        title={"Sprout is us"}
                        text="We've all been in the business for a few years. Colleagues have come and gone, projects and companies have changed in a world where technology is ever evolving. We've stayed on that path, with its ups and downs, following our passion for software..."
                        color={Colors.beige}
                        linkTo={LinkToPage.SproutIsUs}
                    />
                </li>
                <li className="item-b">
                    <Image
                        alt={"A half closed laptop with some flashy light effects"}
                        src={"https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_960_720.jpg"}
                    />
                </li>
                <li className="item-c">
                    <Image
                        alt={"An island with a lighthouse in the middle of the ocean"}
                        src={"https://cdn.pixabay.com/photo/2023/05/20/16/05/island-8006762_960_720.jpg"}
                    />
                </li>
                <li className="item-d">
                    <Card
                        initialWidth={CardSize.Large}
                        title={"The vision"}
                        text="We've all been in the business for a few years. Colleagues have come and gone, projects and companies have changed in a world where technology is ever evolving. We've stayed on that path, with its ups and downs, following our passion for software..."
                        color={Colors.green}
                        linkTo={LinkToPage.TheVision}
                    />
                </li>
            </ul>
        </Wrapper>
    );
}

export default MainContent2;

const Wrapper = styled.div`
    background: ${(props) => props.theme.backgroundColors.livingRoom};

    .gridwrapper {
        display: grid;
        grid-template-rows: 500px 500px;
        padding-inline-start: 0;
        margin: auto;
        gap: 1.5rem;

        max-width: 1080px;

        > li {
            list-style: none;
            height: 100%;
            width: 100%;
        }

        @media only screen and (max-width: 740px) {
            display: flex;
            flex-direction: column;
            padding: 3rem 1.5rem !important;
            max-width: 400px;

            .item-b {
                display: none;
            }

            .item-c {
                display: none;
            }
        }

        @media only screen and (min-width: ${(props) => props.theme.breakpoints.xs}) {
            grid-template-columns: 1fr 1fr;
            padding: 3rem 3rem 0;

            .item-b {
                grid-column: 2 / span 1;
            }
            .item-c {
                grid-column: 1 / span 1;
            }
            .item-d {
                grid-column: 2 / span 1;
            }
        }

        @media only screen and (min-width: ${(props) => props.theme.breakpoints.sm}) {
            grid-template-columns: 1fr 1fr 1fr;
            padding: 3rem 1rem 0;

            .item-a {
                grid-column: 1 / span 1;
                grid-row: 1 / 2;
            }

            .item-b {
                grid-column: 2 / span 2;
                grid-row: 1 / 2;
            }

            .item-c {
                grid-column: 1 / span 2;
                grid-row: 2 / 2;
            }

            .item-d {
                grid-column: 3 / span 1;
                grid-row: 2 / 2;
            }
        }
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    flex-basis: 100%;
    object-fit: cover;
    border-radius: 2rem;
`;
