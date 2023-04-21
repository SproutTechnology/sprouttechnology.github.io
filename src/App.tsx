import Layout from "./components/Layout";
import React, { Suspense } from 'react';
import Intro from './components/Intro/Index';

function App() {
  return (
    <Layout>
      <div className="h-screen bg-stone-400 items-center justify-center flex">
        <Suspense fallback={null}>
          <Intro/>
        </Suspense>
      </div>
    </Layout>
  );
}

export default App;
