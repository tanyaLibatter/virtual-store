import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { VirtualStore } from './virtual-store';
import './app.module.css';

export function App() {
  return (
    <React.Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<VirtualStore />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
