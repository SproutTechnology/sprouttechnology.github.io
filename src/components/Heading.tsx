import styled from "@emotion/styled";
import { mq } from "../theme";

import { SvgController } from "./SvgController";
import icon from "/sprout_white_name.svg";

function Heading() {
    return (
        <StyledHeading>
            <span>Sprout</span>
            <Logo icon={icon} width="100%" height={232} />
        </StyledHeading>
    );
}

export default Heading;

const Logo = styled(SvgController)`
    ${() => `
        width: 100%;
        height: 232px;

        ${mq["xs"]} { 
            height : 100%;
            max-width : auto;
        }
    `}
`;

const StyledHeading = styled.h1`
    width: 100%;
    margin: auto;
    text-align: center;
    flex-basis: 30%;

    & span {
        display: none;
    }
`;
