import styled from "@emotion/styled";
import React from "react";

interface Props {
    icon: string;
    width?: number | string;
    height?: number | string;
    margin?: string;
}

const Svg = styled.svg<Props>(({ icon, width, height, margin }) => ({
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: width,
    height: height,
    backgroundImage: `url(${icon})`,
    margin: margin,
}));

export const SvgController: React.FC<Props> = ({ icon, width, height, margin }) => {
    return <Svg icon={icon} width={width || 24} height={height || 24} margin={margin || "0"} />;
};
