import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Fragment } from 'react';

import App from './app/app';
import CartIcon from './components/CartIcon';
// import {Cart} from "./components/Cart";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
