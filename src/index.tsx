import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider} from "./services/auth.context";
import ReactGA from "react-ga4";
import './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

ReactGA.initialize("G-3ZW69RYZS8");
ReactGA.send("pageview");

root.render(
  <React.StrictMode>
      <ContextProvider value={500}>
            <App />
      </ContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
