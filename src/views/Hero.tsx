import styled from "@emotion/styled";
import SectionLayout from "../components/SectionLayout";
import Heading from "../components/Heading";
import { mq } from "../theme";
import ViewContainer from "../components/ViewContainer";

function Hero() {
    return (
        <>
            <ViewContainer id="Home">
                <SectionLayout mobileBackgroundUrl="./bird-illustration.png" desktopBackgroundUrl="./bird-illustration.png" isHero>
                    <HeroContent>
                        <Heading />
                        <SubheadingWrapper>
                            <Subheading>
                                <span>Welcome to our universe.&nbsp;</span>
                                <span>A growing ecosystem of&nbsp;</span>
                                <div>
                                    <em>collab&shy;orating people </em>
                                </div>
                                <span>ideas and initiatives</span>
                            </Subheading>
                        </SubheadingWrapper>
                    </HeroContent>
                </SectionLayout>
            </ViewContainer>
        </>
    );
}

export default Hero;

const HeroContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: 18svh;
    gap: ${({ theme }) => theme.spacing.sm};
    padding-bottom: ${({ theme }) => theme.spacing.md};

    ${mq["sm"]} {
        margin-top: initial;
        height: 100%;
        gap: ${({ theme }) => theme.spacing.lg};
    }
`;

const SubheadingWrapper = styled.div`
    all: unset;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};

    ${mq["sm"]} {
        align-items: flex-start;
        gap: ${({ theme }) => theme.spacing.sm};
    }
`;

const Subheading = styled.h2`
    all: unset;
    display: inline;
    justify-items: center;
    flex-direction: column;
    color: ${({ theme }) => theme.colors.blueWhale};
    text-transform: uppercase;

    & * {
        font-family: ${({ theme }) => theme.fontFamily.bayon};
        line-height: ${({ theme }) => theme.lineHeight.md};
        font-size: ${({ theme }) => theme.fontSize.lg};
    }

    ${mq["sm"]} {
        display: flex;
    }

    & > div {
        display: flex;
        flex-direction: column;

        align-items: baseline;
        flex-wrap: wrap;

        ${mq["sm"]} {
            display: flex;
        }

        em {
            display: block;
            line-height: ${({ theme }) => theme.lineHeight.lg};
            overflow-wrap: anywhere;
            font-size: ${({ theme }) => theme.lineHeight.lg};

            ${mq["sm"]} {
                display: inline;
                font-size: ${({ theme }) => theme.fontSize.xl};
                line-height: ${({ theme }) => theme.lineHeight.xl};
            }

            /* media exception */
            @media only screen and (min-width: 732px) {
                margin-left: ${({ theme }) => theme.fontSize.xl};
            }
        }
    }
`;
