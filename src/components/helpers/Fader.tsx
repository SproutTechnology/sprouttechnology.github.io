import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes({
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
});

const fadeOut = keyframes({
    "100%": { opacity: 0 },
    "0%": { opacity: 1 },
});

export const Fader = styled.div<{ time?: string; delay?: string; revert?: boolean }>(({ time = "0.35", delay = "0", revert }) => ({
    opacity: "0",
    animation: `${revert ? fadeOut : fadeIn} ${time}s ${delay}s cubic-bezier(0.36, 0, 0.09, 1) forwards`,
}));

const fadeScalingIn = keyframes({
    "0%": { opacity: 0, scale: "0.9" },
    "100%": { opacity: 1, scale: "1" },
});

const fadeScalingOut = keyframes({
    "100%": { opacity: 0, scale: "1" },
    "0%": { opacity: 1, scale: "0.9" },
});

export const FadeScale = styled.div<{ time?: string; delay?: string; revert?: boolean }>(({ time = "0.35", delay = "0", revert }) => ({
    opacity: "0",
    position: "relative",
    animation: `${revert ? fadeScalingOut : fadeScalingIn} ${time}s ${delay}s cubic-bezier(0.36, 0, 0.09, 1) forwards`,
}));
