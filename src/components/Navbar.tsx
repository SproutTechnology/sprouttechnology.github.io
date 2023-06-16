import { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { ValueAnimationTransition, useAnimate } from "framer-motion";

import Logo from "../components/Logo";
import classNames from "classnames";

const Button = styled.button`
    appearance: none;
    cursor: pointer;
    border: 0;
    background: transparent;
    font-size: 0.5rem;
`;

const HamburgerMenu = styled.span`
    display: inline-block;

    width: 4em;
    height: 0.5em;
    background: #fcfcfc;
    position: relative;
    transition: 0.5s;

    &:before {
        top: -1em;
        left: 0;
    }

    &:after {
        top: 1em;
        left: 0;
    }

    &:before,
    &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fcfcfc;
        transition: 0.5s;
    }

    &.active {
        background: rgb(0, 0, 0, 0);
    }

    &.active:before {
        top: 0;
        transform: rotate(45deg);
    }

    &.active:after {
        top: 0;
        transform: rotate(135deg);
    }
`;

const Nav = styled.nav`
    display: flex;
    background-color: ${(props) => props.theme.backgroundColors.charcoal};
    padding-left: ${(props) => props.theme.spacing.large};
    padding-right: ${(props) => props.theme.spacing.large};
    align-items: center;
    justify-content: space-between;
    height: 10vh;

    position: sticky;
    top: 0;
    z-index: 1;

    > svg {
        z-index: 100;
    }
`;

const MenuWrapper = styled.div`
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;

    width: 200%;
    height: 200%;

    transform: translate(100%, -100%);

    border-radius: 9999px;

    transition: transform 1s linear;

    &[data-open="true"] {
        transform: translate(50%, -50%);
    }
`;

const MenuAreas = styled.div`
    display: flex;
    flex-wrap: wrap;

    width: 100%;
    height: 100%;
`;

const Quadrant = styled.div`
    position: relative;

    flex: 1 1 50%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const NavbarItems = ({ openMenu }: { openMenu: boolean }) => {
    const props = openMenu ? {} : { tabIndex: -1, inert: "" };
    return (
        <ul>
            <li>
                <a href="/about" {...props}>
                    About
                </a>
            </li>
            <li>
                <a href="/employees" {...props}>
                    Employees
                </a>
            </li>
            <li>
                <a href="/career" {...props}>
                    Career
                </a>
            </li>
            <li>
                <a href="/contact" {...props}>
                    Contact
                </a>
            </li>
        </ul>
    );
};

// const paths = [
//     "M0 477.3C-32.5 438.4 -65.1 399.5 -103.5 386.4C-142 373.3 -186.4 386 -215 372.4C-243.6 358.8 -256.5 318.8 -297 297C-337.5 275.2 -405.6 271.6 -413.4 238.6C-421.1 205.7 -368.4 143.5 -369 98.9C-369.6 54.2 -423.4 27.1 -477.3 0L0 0Z",
//     "M0 477.3C-41.3 465.5 -82.6 453.8 -115.2 429.8C-147.7 405.9 -171.6 369.7 -201.5 349C-231.4 328.3 -267.3 323.1 -309.7 309.7C-352.1 296.4 -400.9 274.9 -413.4 238.6C-425.8 202.4 -402 151.2 -406.7 109C-411.3 66.7 -444.3 33.4 -477.3 0L0 0Z",
// "M0 477.3C-33.4 443.6 -66.9 409.9 -108.4 404.7C-150 399.5 -199.8 422.8 -238.6 413.4C-277.5 403.9 -305.5 361.9 -318.2 318.2C-330.9 274.5 -328.4 229.3 -336.9 194.5C-345.4 159.7 -365 135.2 -390.2 104.6C-415.5 73.9 -446.4 36.9 -477.3 0L0 0Z",
// "M0 477.3C-42.3 468.3 -84.5 459.2 -117 436.6C-149.4 414 -172.1 377.8 -206.5 357.7C-240.9 337.5 -287.2 333.4 -306.9 306.9C-326.6 280.4 -319.6 231.6 -346.4 200C-373.2 168.4 -433.6 154 -461 123.5C-488.5 93.1 -482.9 46.5 -477.3 0L0 0Z",
// "M 0 1431.9 C -84.6 1404.9 -169 1377.6 -234 1309.8 C -298.8 1242 -344.2 1133.4 -413 1073.1 C -481.8 1012.5 -574.4 1000.2 -613.8 920.7 C -653.2 841.2 -639.2 694.8 -692.8 600 C -746.4 505.2 -867.2 462 -922 370.5 C -977 279.3 -965.8 139.5 -954.6 0 L 0 0 Z",
// "M 0 1431.9 C -270.72 1404.9 -540.8 1377.6 -748.8 1309.8 C -956.16 1242 -1101.44 1133.4 -1321.6 1073.1 C -1541.76 1012.5 -1838.08 1000.2 -1964.16 920.7 C -2090.24 841.2 -2045.44 694.8 -2216.96 600 C -2388.48 505.2 -2775.04 462 -2950.4 370.5 C -3126.4 279.3 -3090.56 139.5 -3288 4 L 0 0 Z",
// "M 0 1431.9 C -270.72 1404.9 -540.8 1377.6 -715 1470 C -973 1594 -1110 1434 -1421 1332 C -1826 1195 -1838.08 1000.2 -2143 831 C -2431 654 -2473 383 -2572 605 C -2718 840 -2775.04 462 -2950.4 370.5 C -3168 238 -3090.56 139.5 -3288 4 L 0 0 Z",
// "M0 2049C-224.2 1847.2 -448.3 1645.3 -616.9 1489.3C-785.4 1333.3 -898.4 1223 -1132.1 1132.1C-1365.7 1041.2 -1720.1 969.6 -1893 784.1C-2066 598.7 -2057.5 299.3 -2049 0L0 0Z",
//
// "m 0 2418.4 c -127.6 -1.6 -255.2 -2.8 -378.4 -30 c -123.2 -26.8 -242 -79.6 -353.2 -136.4 c -111.2 -56.8 -214.8 -117.2 -334.4 -160 c -119.6 -42.4 -254.8 -66.8 -349.2 -144 c -94.8 -77.2 -148.4 -207.2 -225.2 -307.6 c -76.8 -100.4 -176.8 -171.2 -259.2 -260.4 c -82.4 -88.8 -147.2 -195.6 -214 -303.2 c -66.8 -107.6 -135.2 -216 -172.8 -334 c -37.2 -118 -43.6 -245.6 -60.4 -371.2 c -16.8 -125.2 -44 -248.4 -71.6 -371.6 l 2418.4 0 z",
// ];

// const paths = [
//     "M 0 887.84 C -48.67 836.535 -97.34 785.385 -154.535 776.86 C -211.73 768.18 -277.605 802.28 -324.415 783.37 C -371.225 764.305 -399.125 692.385 -430.59 644.335 C -462.055 596.44 -497.085 572.415 -551.335 551.335 C -605.43 530.1 -678.59 511.81 -694.71 464.225 C -710.675 416.485 -669.6 339.295 -698.895 289.385 C -728.035 239.63 -827.545 216.845 -870.79 173.135 C -913.88 129.425 -900.86 64.79 -887.84 0 L 0 0 Z",
//     "M 0 887.84 C -61.535 892.645 -123.07 897.45 -173.135 870.79 C -223.2 843.975 -261.795 785.695 -315.58 761.825 C -369.365 737.955 -438.34 748.495 -476.16 712.69 C -514.135 676.885 -520.8 594.58 -535.99 535.99 C -551.18 477.4 -574.895 442.37 -614.73 410.75 C -654.565 379.13 -710.675 351.075 -751.75 311.395 C -792.825 271.87 -819.02 220.72 -839.17 166.935 C -859.32 113.15 -873.58 56.575 -887.84 0 L 0 0 Z",
//     "M 0 887.84 C -54.25 857.925 -108.5 828.165 -159.96 804.14 C -211.42 780.27 -260.245 761.98 -303.18 731.755 C -345.96 701.53 -382.695 659.215 -413.385 618.605 C -444.075 577.995 -468.72 539.09 -517.39 517.39 C -565.905 495.535 -638.6 490.885 -695.95 465 C -753.3 439.27 -795.15 392.305 -820.26 339.76 C -845.215 287.215 -853.43 229.09 -861.955 171.43 C -870.48 113.925 -879.16 56.885 -887.84 0 L 0 0 Z",
//     "M 0 887.84 C -61.69 893.575 -123.225 899.31 -173.135 870.79 C -223.2 842.115 -261.33 779.03 -310.155 748.96 C -359.135 718.89 -418.5 721.99 -471.045 704.94 C -523.59 687.89 -569.005 651 -610.545 610.545 C -651.93 570.09 -689.13 526.07 -712.69 476.16 C -736.25 426.25 -745.86 370.295 -771.9 319.765 C -797.785 269.08 -839.945 223.82 -861.955 171.43 C -883.965 119.04 -885.825 59.52 -887.84 0 L 0 0 Z",
// ];

// const paths = [
//     "M 0 1018.24 C -49.28 1018.4 -98.56 1018.56 -144.32 1004 C -190.08 989.6 -232.32 960.64 -277.28 944.16 C -322.24 927.68 -369.92 924 -416 911.04 C -462.24 898.24 -506.88 876.32 -542.4 844 C -577.92 811.52 -604.48 768.64 -636 733.92 C -667.52 699.2 -704.16 672.64 -744.8 645.44 C -785.6 618.24 -830.56 590.4 -856.64 550.56 C -882.72 510.56 -889.92 458.56 -899.52 410.72 C -908.96 363.04 -920.48 319.36 -941.12 276.32 C -961.6 233.28 -991.36 190.56 -1005.6 144.64 C -1020 98.56 -1019.2 49.28 -1018.24 0 L 0 0 Z",
//     "M 0 1018.24 C -46.08 996.64 -92.16 974.88 -138.4 962.88 C -184.64 950.88 -231.2 948.64 -275.36 938.08 C -319.68 927.52 -361.92 908.64 -409.44 896.48 C -456.96 884.48 -509.92 878.88 -546.72 850.72 C -583.36 822.4 -604 771.36 -639.2 737.6 C -674.4 703.84 -724.32 687.52 -753.28 652.8 C -782.4 618.08 -790.72 564.8 -814.4 523.36 C -837.92 481.76 -876.96 451.84 -908.16 414.72 C -939.36 377.6 -962.88 333.28 -976.96 286.88 C -991.04 240.48 -995.68 192 -1000.96 143.84 C -1006.24 95.68 -1012.16 47.84 -1018.24 0 L 0 0 Z",
// ];

// const paths = [
//     "M 0 636.4 C -44.96 621.9 -90.08 607.3 -139.52 606.8 C -189.12 606.2 -243.04 619.6 -286.88 610.6 C -330.56 601.6 -364.16 570.2 -402.72 551.2 C -441.44 532.2 -485.12 525.6 -531.2 516.5 C -577.12 507.4 -625.44 495.9 -658.08 474.6 C -690.56 453.3 -707.36 422.3 -735.2 398.2 C -763.04 374 -802.08 356.7 -831.84 334.1 C -861.6 311.5 -881.92 283.6 -893.6 255.1 C -905.44 226.6 -908.48 197.5 -928.8 170.4 C -948.96 143.4 -986.4 118.3 -1004 90.2 C -1021.76 62.2 -1020 31.1 -1018.24 0 L 0 0 Z",
//     "M 0 636.4 C -45.44 622.6 -90.72 608.7 -139.36 605.8 C -188 602.8 -239.84 610.8 -282.24 600.6 C -324.48 590.5 -357.12 562.2 -402.08 550.3 C -447.04 538.4 -504.32 542.9 -544.16 529.1 C -583.84 515.4 -606.24 483.6 -640.16 461.8 C -674.08 439.9 -719.36 428.2 -756.96 409.9 C -794.56 391.7 -824.16 367 -846.56 340.1 C -869.12 313.1 -884.16 284 -893.6 255.1 C -903.2 226.1 -907.04 197.3 -928.8 170.4 C -950.56 143.6 -989.92 118.7 -1007.84 90.6 C -1025.76 62.5 -1021.92 31.2 -1018.24 0 L 0 0 Z",
//     "M 0 636.4 C -45.76 622.7 -91.36 608.9 -139.36 605.8 C -187.36 602.6 -237.6 610 -285.28 607.4 C -333.12 604.7 -378.4 592 -423.04 578.9 C -467.68 565.8 -511.68 552.3 -546.72 531.7 C -581.76 511 -607.84 483.1 -637.12 459.5 C -666.24 435.9 -698.72 416.6 -731.52 396.2 C -764.48 375.8 -797.76 354.3 -821.12 329.8 C -844.32 305.3 -857.44 277.8 -886.4 253 C -915.2 228.1 -959.68 205.9 -970.24 178.1 C -980.8 150.2 -957.44 116.8 -959.68 86.2 C -962.08 55.6 -990.08 27.8 -1018.24 0 L 0 0 Z",
//     "M 0 636.4 C -46.4 624.3 -92.96 612.3 -139.36 605.8 C -185.76 599.2 -232.16 598.2 -279.52 594.9 C -326.88 591.5 -375.2 585.9 -419.36 574 C -463.52 562.1 -503.36 543.9 -538.88 524.1 C -574.4 504.3 -605.6 482.7 -646.4 466.3 C -687.36 449.9 -738.24 438.6 -769.6 416.8 C -800.8 394.9 -812.64 362.7 -835.84 335.7 C -859.04 308.8 -893.76 287.3 -915.52 261.3 C -937.12 235.3 -945.92 205 -957.92 175.8 C -970.08 146.6 -985.6 118.6 -996.16 89.5 C -1006.72 60.4 -1012.48 30.2 -1018.24 0 L 0 0 Z",
// ];

const paths = [
    "M0 486.7C-25.7 458.2 -51.5 429.6 -71.7 406.7C-92 383.9 -106.8 366.8 -136.8 375.9C-166.9 384.9 -212.1 420.1 -243.4 421.5C-274.6 422.9 -291.8 390.5 -298.9 356.2C-306 321.9 -303.2 285.6 -307.9 258.4C-312.7 231.2 -325.1 212.9 -336.9 194.5C-348.6 176.1 -359.7 157.4 -383.4 139.5C-407.1 121.7 -443.5 104.7 -462.9 81.6C-482.2 58.5 -484.5 29.2 -486.7 0L0 0Z",
    "M0 486.7C-23.8 460 -47.5 433.2 -76.2 432.3C-104.9 431.4 -138.6 456.3 -165.2 453.9C-191.8 451.4 -211.2 421.5 -229 396.6C-246.8 371.8 -262.8 351.9 -279.6 333.2C-296.4 314.6 -314 297.1 -337.1 282.8C-360.1 268.6 -388.8 257.5 -414.8 239.5C-440.9 221.5 -464.4 196.5 -457.4 166.5C-450.4 136.4 -412.8 101.3 -412.6 72.8C-412.4 44.2 -449.6 22.1 -486.7 0L0 0Z",
    "M0 486.7C-30 483.5 -60 480.3 -80.6 457C-101.1 433.6 -112.1 390.1 -141.3 388.1C-170.4 386.1 -217.6 425.7 -243.4 421.5C-269.1 417.4 -273.5 369.6 -285.4 340.1C-297.3 310.7 -316.9 299.5 -340.9 286C-364.9 272.6 -393.5 256.7 -401.8 232C-410.2 207.3 -398.4 173.6 -405.9 147.8C-413.5 121.9 -440.3 103.9 -457 80.6C-473.6 57.3 -480.2 28.6 -486.7 0L0 0Z",
    "M0 486.7C-27.6 470.6 -55.2 454.4 -76.4 433.3C-97.6 412.2 -112.5 386.2 -139.5 383.4C-166.6 380.5 -205.8 400.8 -223.5 387.1C-241.2 373.4 -237.5 325.7 -260.3 310.2C-283.2 294.8 -332.7 311.5 -363.9 305.3C-395 299.1 -407.8 270 -421.5 243.4C-435.2 216.7 -449.8 192.5 -454.8 165.5C-459.8 138.6 -455.2 109 -458.9 80.9C-462.6 52.9 -474.7 26.4 -486.7 0L0 0Z",
];

const waveAnimationOpts: ValueAnimationTransition = {
    ease: "linear",
    duration: 1,
    times: [0, 0.16, 0.33, 0.5, 0.66, 0.83],
};

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);

    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(
            scope.current,
            {
                d: openMenu ? paths : paths.slice().reverse(),
            },
            waveAnimationOpts,
        );
    }, [openMenu]);

    return (
        <Nav>
            <Logo></Logo>

            <Button onClick={() => setOpenMenu((x) => !x)}>
                <HamburgerMenu className={classNames(openMenu && "active")}></HamburgerMenu>
            </Button>

            <MenuWrapper data-open={openMenu}>
                <MenuAreas>
                    <Quadrant />
                    <Quadrant />
                    <Quadrant>
                        <NavbarItems openMenu={openMenu} />

                        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
                            <div style={{ position: "relative", width: "100%", height: "100%", zIndex: -1 }}>
                                <svg
                                    width="900"
                                    height="900"
                                    viewBox="0 0 900 900"
                                    preserveAspectRatio="xMaxYMin slice"
                                    style={{ position: "absolute", width: "100%", height: "100%", overflow: "visible" }}
                                >
                                    <path
                                        ref={scope}
                                        transform="translate(900, 0) scale(2,2)"
                                        style={{
                                            fill: "#E5DBD1",
                                        }}
                                    />
                                </svg>
                            </div>
                        </div>
                    </Quadrant>
                    <Quadrant />
                </MenuAreas>
            </MenuWrapper>
        </Nav>
    );
}

export default Navbar;
