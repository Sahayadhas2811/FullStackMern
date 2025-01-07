import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <React.StrictMode>
      {/* <CssVarsProvider> */}
        <App />
      {/* </CssVarsProvider> */}
    </React.StrictMode>
  );
} else {
  console.error('Root element not found!');
}