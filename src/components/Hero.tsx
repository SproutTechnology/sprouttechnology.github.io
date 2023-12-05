

import styled from "@emotion/styled";
import SectionLayout from "./SectionLayout";
import Heading from "./Heading";
import { mq } from "../theme";


function Hero() {
    return (
        <SectionLayout mobileBackgroundUrl="./background_mobile.png" desktopBackgroundUrl="./background.png">
            <Heading color="white"></Heading>
            <SubheadingWrapper>
                <Subheading>
                    <span>Welcome to our universe</span>
                    <div>
                        <span>a growing ecosystem of </span>
                        <em>collaborating people </em>
                    </div>
                    <span>ideas and initiatives</span> 
                
                </Subheading>
                <Link>Lets start here {'>'}_</Link>
            </SubheadingWrapper>
        </SectionLayout>
    );
}


export default Hero;


const SubheadingWrapper = styled.div`
    all : unset;
    display : flex;
    justify-items : center;
    flex-direction : column;
    gap :  ${(props) => props.theme.spacing.sm};
`

const Link = styled.a`
    cursor : pointer;
    font-size : 1rem;
    font-family : AzeretMono; 
`

const Subheading = styled.h2`
    all : unset;
    display : flex;
    justify-items : center;
    flex-direction : column;
    color : ${(props) => props.theme.headline.color};
    text-transform : uppercase;
    & * {
        font-family : ${(props) => props.theme.headline.font};
        line-height : 3rem;
        font-size : ${(props) => props.theme.headline.fontSize};
    }

    & > div {    
        display : flex;
        align-items : center;
        flex-wrap : wrap;
        ${mq["xs"]} { 
            gap : ${(props) => props.theme.spacing.sm};
        }
        em {
            line-height : 3.5rem;
            overflow-wrap : anywhere;
            font-size : ${(props) => props.theme.emphasizedHeadline.fontSize};
        }
    }
   
`

