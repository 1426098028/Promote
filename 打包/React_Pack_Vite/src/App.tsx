import { useState } from 'react';
import reactLogo from './assets/react.svg';
import TabsPage from './views/TabsPage';
import viteLogo from '/vite.svg';
import { Card, Splitter } from 'antd';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <Splitter style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '100%', height: '100%' }} >
      <Splitter.Panel min="20%" defaultSize="20%" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <Card size="small" title="通过Vite构建React项目" >
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </Card>
      </Splitter.Panel>
      <Splitter.Panel >
        <TabsPage />
      </Splitter.Panel>
    </Splitter>
  );
}

export default App;
