

import styled from "@emotion/styled";
import { ReactNode } from "react";
import { mq } from "../theme";

interface Props {
    children: ReactNode;
    desktopBackgroundUrl? : string;
    mobileBackgroundUrl? : string;
   
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
   
    display : flex;
    gap : 1rem;    
    flex-direction : column;
    align-items : center;
    width : 95vw;
  
    ${mq["xs"]} {
    
        width : 80vw
        
    }
   
`;

const BackgroundDiv = styled.div`
    display : flex;
    flex-direction : column;
    padding-top: 35vw;
   
    align-items : center;
    background-repeat : no-repeat;
    background-size : cover;
    height : 100vh;
    background-position-x : center;
    background-image :  ${(props : StyledHeaderProps) => `url(${props.mobileBackgroundUrl})` };
    ${mq["xs"]} {
        padding-top: 10rem;
        background-image :  ${(props : StyledHeaderProps) => `url(${props.desktopBackgroundUrl})` };
    }

`;