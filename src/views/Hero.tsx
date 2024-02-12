import styled from "@emotion/styled";
import SectionLayout from "../components/SectionLayout";
import Heading from "../components/Heading";
import { mq } from "../theme";
import ViewContainer from "../components/ViewContainer";

function Hero() {
    return (
        <ViewContainer id="Home">
            <SectionLayout mobileBackgroundUrl="./background_mobile.png" desktopBackgroundUrl="./background.png">
                <HeroContent>
                    <Heading />
                    <SubheadingWrapper>
                        <Subheading>
                            <span>Welcome to our universe.&nbsp;</span>
                            <div>
                                <span>A growing ecosystem of&nbsp;</span>
                                <em>collab&shy;orating people </em>
                            </div>
                            <span>ideas and initiatives</span>
                        </Subheading>
                    </SubheadingWrapper>
                </HeroContent>
            </SectionLayout>
        </ViewContainer>
    );
}

export default Hero;

const HeroContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 33.5svh;
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
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};

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
        line-height: ${({ theme }) => theme.lineHeight.lg};
        font-size: ${({ theme }) => theme.fontSize.lg};
    }

    ${mq["sm"]} {
        display: flex;
    }

    & > div {
        display: inline;
        align-items: baseline;
        flex-wrap: wrap;

        ${mq["sm"]} {
            display: flex;
        }

        em {
            display: block;
            line-height: ${({ theme }) => theme.lineHeight.xl};
            overflow-wrap: anywhere;
            font-size: ${({ theme }) => theme.fontSize.xl};

            ${mq["sm"]} {
                display: inline;
            }
        }
    }
`;
