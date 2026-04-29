import styled from 'styled-components';
import type { FamilyTab, FamilyTabId } from '../../../i18n/site-content';
import { LabelText } from '../../atoms/label-text/label-text';

interface FamilyTabsProps {
  activeTab: FamilyTabId;
  label: string;
  tabs: FamilyTab[];
  registerTab: (index: number, element: HTMLButtonElement | null) => void;
  onKeyDown: (index: number, key: string) => void;
  onSelect: (tabId: FamilyTabId) => void;
}

const Tabs = styled.div`
  display: flex;
  gap: 0;
  border-left: 1px solid ${({ theme }) => theme.color.border};
  border-top: 1px solid ${({ theme }) => theme.color.border};
  border-right: 1px solid ${({ theme }) => theme.color.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 16px 20px;
  background: ${({ theme }) => theme.color.background};
  border: none;
  border-right: 1px solid ${({ theme }) => theme.color.border};
  border-bottom: 1px solid ${({ theme, $active }) => ($active ? theme.color.background : theme.color.border)};
  color: ${({ theme, $active }) => ($active ? theme.color.primary : theme.color.textDim)};
  cursor: pointer;
  text-align: left;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: ${({ theme }) => theme.color.surface};
    color: ${({ theme, $active }) => ($active ? theme.color.primary : theme.color.textMuted)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 0;
    padding: 14px 12px;
  }
`;

const TabCount = styled.span<{ $active: boolean }>`
  display: block;
  margin-bottom: 6px;
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
  color: ${({ theme, $active }) => ($active ? theme.color.primary : theme.color.textDim)};
  transition: color 0.15s ease;
`;

const TabLabel = styled(LabelText).attrs({
  as: 'span',
  $tone: 'default',
})<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.color.primary : theme.color.textDim)};
`;

export function FamilyTabs({
  activeTab,
  label,
  tabs,
  registerTab,
  onKeyDown,
  onSelect,
}: FamilyTabsProps): JSX.Element {
  return (
    <Tabs role="tablist" aria-label={label}>
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTab;

        return (
          <TabButton
            key={tab.id}
            ref={(element) => registerTab(index, element)}
            type="button"
            role="tab"
            id={`family-tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`family-panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            $active={isActive}
            onClick={() => onSelect(tab.id)}
            onKeyDown={(event) => {
              if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                event.preventDefault();
                onKeyDown(index, event.key);
              }
            }}
          >
            <TabCount $active={isActive}>{tab.count}</TabCount>
            <TabLabel $active={isActive}>{tab.label}</TabLabel>
          </TabButton>
        );
      })}
    </Tabs>
  );
}
