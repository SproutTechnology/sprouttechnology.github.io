import Layout from "./components/Layout";
import React, { Suspense } from 'react';
import Index from './components/Intro/Index';
import Particles from './components/Intro/Particles';

function App() {
  return (
    <Layout>
      <div className="h-screen bg-stone-400 items-center justify-center flex">
        <Suspense fallback={null}>
          <Index/>
        </Suspense>
      </div>
    </Layout>
  );
}

export default App;
