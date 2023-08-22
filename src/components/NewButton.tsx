import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface Props {
    onClick: () => void;
    label?: string;
}

export default function NewButton({ onClick, label = "Read more" }: Props) {
    return (
        <ButtonWrapper>
            <div className="content">
                <div className="button_container">
                    <div className="button_su">
                        <span className="su_button_circle"></span>
                        <button onClick={onClick} className="button_su_inner">
                            <span className="button_text_container">{label}</span>
                        </button>
                    </div>
                </div>
            </div>
        </ButtonWrapper>
    );
}

const ButtonWrapper = styled.div(({ theme }) => [
    css`
        .credit {
            text-align: center;
            color: rgba(255, 255, 255, 0.4);
        }

        .content {
            padding-top: 45px;
            padding-bottom: 20px;
        }

        .button_container {
            width: 176px;
            margin: 0 auto;
        }

        .button_su {
            overflow: hidden;
            position: relative;
            display: inline-block;
            border-radius: 50px;
            border: none;
            height: 3.5rem;
            width: 100%;
        }

        .su_button_circle {
            border-radius: 1000px;
            position: absolute;
            left: 0;
            top: 0;
            width: 0px;
            height: 0px;
            margin-left: 0px;
            margin-top: 0px;
            pointer-events: none;
            /*animation-timing-function: ease-in-out; */
        }

        .button_su_inner {
            background: ${theme.backgroundColors.charcoal};
            color: white;
            cursor: pointer;

            font-weight: normal;
            text-align: center;
            font-size: ${theme.fontSize.button};
            letter-spacing: 1px;
            transition: 400ms;
            text-decoration: none;

            z-index: 100000;

            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            border: none;

            :hover {
                color: black;
            }
        }

        .button_text_container {
            position: relative;
            z-index: 10000;
        }

        .explode-circle {
            animation: explode 0.5s forwards;
        }

        .desplode-circle {
            animation: desplode 0.5s forwards;
        }

        @keyframes explode {
            0% {
                width: 0px;
                height: 0px;
                margin-left: 0px;
                margin-top: 0px;
                background-color: rgba(244, 244, 244, 1);
            }
            100% {
                width: 400px;
                height: 400px;
                margin-left: -200px;
                margin-top: -200px;
                background-color: rgba(255, 255, 255, 1);
            }
        }

        @keyframes desplode {
            0% {
                width: 400px;
                height: 400px;
                margin-left: -200px;
                margin-top: -200px;
                background-color: rgba(255, 255, 255, 1);
            }
            100% {
                width: 0px;
                height: 0px;
                margin-left: 0px;
                margin-top: 0px;
                background-color: rgba(244, 244, 244, 1);
            }
        }
    `,
]);
