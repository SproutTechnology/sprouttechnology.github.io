import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const render = vi.fn();
  const createRoot = vi.fn(() => ({ render }));
  const App = vi.fn(() => null);
  const GlobalStyles = vi.fn(() => null);
  const I18nProvider = vi.fn(({ children }: { children: React.ReactNode }) => <>{children}</>);
  const ThemeModeProvider = vi.fn(({ children }: { children: React.ReactNode }) => <>{children}</>);

  return {
    App,
    GlobalStyles,
    I18nProvider,
    ThemeModeProvider,
    createRoot,
    render,
  };
});

vi.mock('react-dom/client', () => ({
  default: {
    createRoot: mocks.createRoot,
  },
  createRoot: mocks.createRoot,
}));

vi.mock('./App', () => ({
  default: mocks.App,
}));

vi.mock('./globalStyles', () => ({
  GlobalStyles: mocks.GlobalStyles,
}));

vi.mock('./i18n/use-translation', () => ({
  I18nProvider: mocks.I18nProvider,
}));

vi.mock('./theme/theme-provider', () => ({
  ThemeModeProvider: mocks.ThemeModeProvider,
}));

describe('main', () => {
  beforeEach(() => {
    vi.resetModules();
    mocks.createRoot.mockClear();
    mocks.render.mockClear();
    mocks.App.mockClear();
    mocks.GlobalStyles.mockClear();
    mocks.I18nProvider.mockClear();
    mocks.ThemeModeProvider.mockClear();
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('mounts the app into the root element with the expected provider tree', async () => {
    await import('./main');

    expect(mocks.createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(mocks.render).toHaveBeenCalledTimes(1);

    const renderTree = mocks.render.mock.calls[0][0];
    expect(renderTree.type).toBe(React.StrictMode);

    const i18nProvider = renderTree.props.children;
    expect(i18nProvider.type).toBe(mocks.I18nProvider);

    const themeModeProvider = i18nProvider.props.children;
    expect(themeModeProvider.type).toBe(mocks.ThemeModeProvider);

    const themeChildren = React.Children.toArray(themeModeProvider.props.children);
    expect(themeChildren).toHaveLength(2);
    expect((themeChildren[0] as React.ReactElement).type).toBe(mocks.GlobalStyles);
    expect((themeChildren[1] as React.ReactElement).type).toBe(mocks.App);
  });
});
