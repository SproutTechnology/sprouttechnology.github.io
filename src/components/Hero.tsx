

import styled from "@emotion/styled";
import SectionLayout from "./SectionLayout";

function Hero() {
    return (
        <SectionLayout mobileBackgroundUrl="./background_mobile.png" desktopBackgroundUrl="./background.png">
            <Heading>Sprout.</Heading>
            <Subheading>
                <span>Welcome to our universe</span>
                <div>
                    <span>a growing ecosystem of </span>
                    <em>collaborating people </em>
                </div>
                <span>ideas and initiatives</span> 
            </Subheading>
            <Link>Lets start here</Link>
        </SectionLayout>
    );
}


export default Hero;

const Link = styled.a`
    text-align : left;
    font-family : AzeretMono;
    width : 80%;
`

const Subheading = styled.h2`
    all : unset;
    display : flex;
    flex-direction : column;
    color : #4C80DB;
    font-size : 4rem;
    text-align : center;
    font-family : Bayon;
    line-height : 3.5rem;
    text-transform : uppercase;
    text-align : left;
    width : 80%;
    & * {
        font-family : Bayon;
    }
    & > div {
        display : flex;
        gap : 1rem;
        flex-wrap : wrap;
        em {
            font-size : 5rem;
            white-space : nowrap;
            font-weight : 400;
        }

        & span {
            white-space : nowrap;
        }
    }
   
        &  span {
            font-size: 4rem;
        }  
`

const Heading = styled.h1`
    margin : unset;
    color : white;
    font-size : 15rem;
    text-align : center;
    font-family : Sen, sans-serif;
    font-weight : bold;
`
