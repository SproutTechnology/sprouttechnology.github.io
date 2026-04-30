import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyles } from './globalStyles';
import { I18nProvider } from './i18n/use-translation';
import { ThemeModeProvider } from './theme/theme-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <ThemeModeProvider>
        <GlobalStyles />
        <App />
      </ThemeModeProvider>
    </I18nProvider>
  </React.StrictMode>,
);
