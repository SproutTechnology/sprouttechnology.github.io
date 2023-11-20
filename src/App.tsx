import React, { Suspense } from 'react';
import IntoAino from './components/IntroAino/Index';
import Intro from './components/Intro/Index';
import WaveEffect from './components/WaveEffect/Index';

function App() {
  return (
    <Suspense fallback={null}>
        {true && <Intro/> }
        {false && <IntoAino/> }
        <img src={'img0.png'} style={{margin: 'auto', width: '100%'}}></img>
        <img src={'img1.png'} style={{margin: 'auto', width: '80%'}}></img>
        <WaveEffect/>
    </Suspense>
  );
}

export default App;
