import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface Space {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string; //example "1rem"
}

export const SpaceWrapper = styled.div<{
    mobile: Space;
    tablet?: Space;
    desktop?: Space;
}>(({ mobile, tablet, desktop }) => [
    css`
        padding: ${mobile.top || 0} ${mobile.right || 0} ${mobile.bottom || 0} ${mobile.left || 0};

        ${tablet &&
        css`
            @media (min-width: 768px) {
                padding: ${tablet?.top || 0} ${tablet?.right || 0} ${tablet?.bottom || 0} ${tablet?.left || 0};
            }
        `}

        ${desktop &&
        css`
            @media (min-width: 960px) {
                padding: ${desktop?.top || 0} ${desktop?.right || 0} ${desktop?.bottom || 0} ${desktop?.left || 0};
            }
        `}
    `,
]);
