import Accordion from './components/Accordion';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <div className="h-screen bg-stone-400 items-center justify-center flex flex-col gap-6">
        <Accordion />
      </div>
    </Layout>
  );
}

export default App;
