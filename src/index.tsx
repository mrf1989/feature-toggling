import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import ToggleRouter from './lib/ToggleRouter';

export const AppContext = createContext<ToggleRouter>(ToggleRouter.getInstance());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider>
        <AppContext.Provider value={ToggleRouter.getInstance()}>
          <App />
        </AppContext.Provider>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
