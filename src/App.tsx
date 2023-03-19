import Layout from "./components/Layout";
import Box from "./components/Box";
import { Canvas } from '@react-three/fiber';
import React from 'react';

function App() {
  return (
    <Layout>
      <div className="h-screen bg-stone-400 items-center justify-center flex">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
        <span className="text-4xl">Placeholder</span>
      </div>
    </Layout>
  );
}

export default App;
