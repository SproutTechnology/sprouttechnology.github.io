import { css } from "@emotion/react";
import Menu from "./Menu";
import styled from "@emotion/styled";
import Logo from "../Logo";

const LogoWrapper = styled.div(() => [
    css`
        position: absolute;
        z-index: 12;
        right: 32px;
        width: 100px;
        top: 4px;
    `,
]);

function Nav() {
    return (
        <>
            <Menu />

            <LogoWrapper>
                <Logo />
            </LogoWrapper>
        </>
    );
}

export default Nav;
