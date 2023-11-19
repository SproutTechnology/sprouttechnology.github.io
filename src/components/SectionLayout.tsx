

import styled from "@emotion/styled";
import { ReactNode } from "react";
import { mq } from "../theme";

interface Props {
    children: ReactNode;
    desktopBackgroundUrl : string;
    mobileBackgroundUrl : string;
   
}
console.log(mq["xs"])
function SectionLayout({ children, desktopBackgroundUrl, mobileBackgroundUrl }: Props) {
    return (
        <BackgroundDiv mobileBackgroundUrl={mobileBackgroundUrl} desktopBackgroundUrl={desktopBackgroundUrl}>   
            <Content>
                {children}
            </Content>
        </BackgroundDiv>
    );
}


export default SectionLayout;


interface StyledHeaderProps {
    desktopBackgroundUrl: string;
    mobileBackgroundUrl : string;
}

const Content = styled.div`
    margin-top: ${(props) => props.theme.navbarHeight};
    display : flex;
    align-items : center;
    gap : 3rem;
    flex-direction : column;
   
`;

const BackgroundDiv = styled.div`
    display : flex;
    flex-direction : column;
    background-repeat : no-repeat;
    background-size : cover;
    height : 100vh;
    background-position-x : center;
    background-image :  ${(props : StyledHeaderProps) => `url(${props.mobileBackgroundUrl})` };
    ${mq["xs"]} {
        background-image :  ${(props : StyledHeaderProps) => `url(${props.desktopBackgroundUrl})` };
    }

`;