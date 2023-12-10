

import styled from "@emotion/styled";
import SectionLayout from "../components/SectionLayout";
import Heading from "../components/Heading";
import { mq } from "../theme";

function Hero() {
    return (
        <SectionLayout mobileBackgroundUrl="./background_mobile.png" desktopBackgroundUrl="./background.png">
            <HeroContent >
                <Heading/>
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
            </HeroContent>
        </SectionLayout>
    );
}


export default Hero;

const HeroContent = styled.div`
    ${({ theme }) => `
        display : flex;
        flex-direction : column;
        align-items : center;
        gap : ${theme.spacing.sm};
        ${mq["xs"]} { 
            gap :${theme.spacing.lg};
         
        }
    `}
`

const SubheadingWrapper = styled.div`
    ${({ theme }) => `
        all : unset;
        display : flex;
        justify-items : center;
        flex-direction : column;
        gap :  ${theme.spacing.xs};
    `}
`

const Link = styled.a`
    ${({ theme }) => `
        cursor : pointer;
        font-size : ${theme.fontSize.xs};
        font-family : ${theme.fontFamily.azeretMono};
        white-space : nowrap;
        width : min-content;
    `} 
`

const Subheading = styled.h2`
    ${({ theme }) => `
        all : unset;
        display : flex;
        justify-items : center;
        flex-direction : column;
        color : ${theme.colors.blueWhale};
        text-transform : uppercase;
        & * {
            font-family :  ${theme.fontFamily.bayon};
            line-height : ${theme.lineHeight.sm};
            font-size : ${theme.fontSize.md};
        }
        & > div {    
            display : flex;
            align-items : center;
            flex-wrap : wrap;
            ${mq["xs"]} { 
                gap : ${theme.spacing.sm};
            }
            em {
                line-height : ${theme.lineHeight.md};
                overflow-wrap : anywhere;
                font-size :  ${theme.fontSize.lg};
            }
        }
    `}
`

