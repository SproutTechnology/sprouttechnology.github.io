import type { RefCallback } from "react";
import styled from "styled-components";
import type { IndustryItem } from "../../../i18n/site-content";
import { CaptionText } from "../../atoms/caption-text/caption-text";
import { LabelText } from "../../atoms/label-text/label-text";

interface IndustryCellProps {
  industryRef: RefCallback<HTMLButtonElement>;
  isActive: boolean;
  isMobileModalOpen: boolean;
  isMobileViewport: boolean;
  item: IndustryItem;
  onBlur: () => void;
  onClick: () => void;
  onFocus: () => void;
  onKeyDown: (key: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const IndustryDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.borderBright};
  margin-bottom: 20px;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
`;

const IndustryName = styled(CaptionText).attrs({
  as: "span",
  $tone: "muted",
  $size: "default",
})`
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
  line-height: 1.3;
  transition: color 0.15s ease;
`;

const IndustryTag = styled(LabelText).attrs<{
  $status: IndustryItem["status"];
}>({
  as: "span",
  $size: "small",
})<{ $status: IndustryItem["status"] }>`
  color: ${({ theme, $status }) =>
    $status === "client" ? theme.color.textDim : theme.color.primaryDim};
  letter-spacing: 0.12em;
  transition: color 0.15s ease;
`;

const IndustryUnderline = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background: ${({ theme }) => theme.color.primary};
  transition: width 0.3s ease;
`;

const Cell = styled.button<{ $active: boolean }>`
  position: relative;
  overflow: hidden;
  padding: 28px 20px 24px;
  border: none;
  background: ${({ theme, $active }) =>
    $active ? theme.color.overlay : theme.color.background};
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.color.surface};
  }

  &:hover ${IndustryName}, &[aria-pressed="true"] ${IndustryName} {
    color: ${({ theme, $active }) =>
      $active ? theme.color.primary : theme.color.text};
  }

  &:hover ${IndustryDot}, &[aria-pressed="true"] ${IndustryDot} {
    background: ${({ theme }) => theme.color.primary};
    transform: scale(1.4);
  }

  &:hover ${IndustryUnderline}, &[aria-pressed="true"] ${IndustryUnderline} {
    width: 100%;
  }

  &[aria-pressed="true"] ${IndustryTag} {
    color: ${({ theme }) => theme.color.primaryDim};
  }
`;

export function IndustryCell({
  industryRef,
  isActive,
  isMobileModalOpen,
  isMobileViewport,
  item,
  onBlur,
  onClick,
  onFocus,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
}: IndustryCellProps): JSX.Element {
  return (
    <Cell
      ref={industryRef}
      type="button"
      $active={isActive}
      aria-pressed={isActive}
      aria-controls={isMobileViewport ? "industry-modal-panel" : "industry-preview-panel"}
      aria-expanded={isMobileViewport ? isMobileModalOpen && isActive : undefined}
      aria-haspopup={isMobileViewport ? "dialog" : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      onKeyDown={(event) => {
        if (
          [
            "ArrowRight",
            "ArrowDown",
            "ArrowLeft",
            "ArrowUp",
            "Home",
            "End",
          ].includes(event.key)
        ) {
          event.preventDefault();
          onKeyDown(event.key);
        }
      }}
    >
      <IndustryDot />
      <IndustryName>{item.name}</IndustryName>
      <IndustryTag $status={item.status}>{item.tag}</IndustryTag>
      <IndustryUnderline />
    </Cell>
  );
}
