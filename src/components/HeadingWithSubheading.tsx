import FluidCenterContainer from "./FluidCenterContainer";
import styled from "@emotion/styled";
import { SpaceWrapper } from "./helpers/SpaceWrapper";

interface Props {
    text: string;
    textColor: string;
    backgroundColor: string;
    subheading: string;
}

interface StyledHeaderProps {
    backgroundColor: string;
}

const StyledHeader = styled.div`
    container-type: inline-size;
    background-color: ${(props: StyledHeaderProps) => props.backgroundColor};
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const MainAndSubHeadingWrapper = styled.div`
    container-type: normal;
    display: grid;
    justify-items: center;
    width: 100%;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(3, 1fr);
`;

const MainHeading = styled.h1`
    font-size: ${(props) => props.theme.fontSize.h1};
    color: ${(props) => props.color};
    margin: unset;
    grid-row: 1;
    grid-column: -1 / 1;
`;

const SubHeading = styled.h2`
    font-size: ${(props) => props.theme.fontSize.h2};
    color: ${(props) => props.color};
    margin: unset;
    padding-top: 10rem;
    margin-left: min(0px, 30rem, 40cqi);
    max-width: 30rem;
    text-align: end;
    grid-row: 2;
    justify-self: center;
    grid-column: 1 / -1;
    @container (width > 450px) {
        grid-column: 2 / -1;
    }
`;

const HeadingWithSubheading = ({ text, textColor, backgroundColor, subheading }: Props) => (
    <StyledHeader backgroundColor={backgroundColor}>
        <FluidCenterContainer padTop={false} centerContent={true}>
            <MainAndSubHeadingWrapper>
                <MainHeading color={textColor}>{text}</MainHeading>
                <SubHeading color={textColor}>{subheading}</SubHeading>
            </MainAndSubHeadingWrapper>
        </FluidCenterContainer>
    </StyledHeader>
);

export default HeadingWithSubheading;
