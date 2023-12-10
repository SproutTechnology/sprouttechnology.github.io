

import styled from "@emotion/styled";
import { ReactNode } from "react";
import { mq } from "../theme";

interface Props {
    children: ReactNode;
    desktopBackgroundUrl? : string;
    mobileBackgroundUrl? : string;
    bgColor? : string;
    fullWidthContent? : ReactNode;
   
}
console.log(mq["xs"])
function SectionLayout({ children, desktopBackgroundUrl = '', mobileBackgroundUrl = '', bgColor = 'black',fullWidthContent }: Props) {
    return (
        <BackgroundDiv bgColor={bgColor} mobileBackgroundUrl={mobileBackgroundUrl} desktopBackgroundUrl={desktopBackgroundUrl}>   
            <Content>
                {children}
            </Content>
            {fullWidthContent}
        </BackgroundDiv>
    );
}


export default SectionLayout;


interface StyledHeaderProps {
    desktopBackgroundUrl: string;
    mobileBackgroundUrl : string;
    bgColor? : string;
}

const Content = styled.div` 
    ${({ theme }) => `
        display : flex;   
        flex-direction : column;
        align-items : center;
        flex-basis : 100%;
        margin-top : 33.5vh;
        height : 85vh;
        max-width : ${theme.breakpoints.lg};
        margin-left : ${theme.spacing.sm};
        margin-right : ${theme.spacing.sm};
       
       
        ${mq["xs"]} {
            margin-left : ${theme.spacing.md};
            margin-right : ${theme.spacing.md};
            margin-top : calc(${theme.spacing.xl} * 1.5);
        }
        ${mq["sm"]} {
            margin-left : ${theme.spacing.lg};
            margin-right : ${theme.spacing.lg};
        }
        ${mq["lg"]} {
            margin-left : ${theme.spacing.xl};
            margin-right : ${theme.spacing.xl};
        }
    `}
`;

const BackgroundDiv = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    background-repeat : no-repeat;
    background-size : 100% 40vh;
    height : 100vh;
    background-position-x : center;
    background-color : ${(props : StyledHeaderProps) => `${props.bgColor}` };
    background-image :  ${(props : StyledHeaderProps) => `url(${props.mobileBackgroundUrl})` };
    ${mq["xs"]} {
        background-size : 100% 100%;
        background-image :  ${(props : StyledHeaderProps) => `url(${props.desktopBackgroundUrl})` };
    }

`;