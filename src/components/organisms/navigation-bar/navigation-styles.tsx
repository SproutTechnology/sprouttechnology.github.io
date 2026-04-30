import styled, { css } from 'styled-components';

export const focusRingStyles = css`
  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.color.primary};
    outline-offset: 4px;
  }
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
