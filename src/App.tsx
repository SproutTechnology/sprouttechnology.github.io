import Layout from "./components/Layout";
import React, { Suspense } from 'react';
import Intro from './components/Intro/Index';

function App() {
  return (
    <Suspense fallback={null}>
      <Intro/>
    </Suspense>
  );
}

export default App;
