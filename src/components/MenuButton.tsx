import { css } from "@emotion/react";
import styled from "@emotion/styled";
import classNames from "classnames";

const Button = styled.button`
    appearance: none;
    cursor: pointer;
    border: 0;
    background: transparent;
    font-size: 1rem;
    padding: 1em 0.5em;
    padding-right: 0;

    &:focus-within {
        // TODO: Have some actual focus-within feedback
        outline: none;
    }
`;

const HamburgerMenu = styled.span<{ isOpen: boolean }>(({ isOpen }) => [
    css`
        display: inline-block;

        width: 2.5em;
        height: 0.2em;
        background: #fcfcfc;
        position: relative;
        transition: 0.5s;

        ${isOpen
            ? css`
                  &:before {
                      left: 0;
                      width: 100% !important;
                  }

                  &:after {
                      left: 0;
                  }
              `
            : css`
                  &:before {
                      top: -1em;
                      left: -1.25em;
                      width: 150% !important;
                  }

                  &:after {
                      left: 0;
                  }
              `};

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
    `,
]);

export function MenuButton({ toggle, isOpen }: { isOpen: boolean; toggle: VoidFunction }) {
    return (
        <Button onClick={toggle}>
            <HamburgerMenu isOpen={isOpen} className={classNames(isOpen && "active")} />
        </Button>
    );
}
