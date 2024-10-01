import { Header } from './components';

import Home from './pages/Home';

function App() {
  return (
    <div>
      <Header key="header" />
      <main className="pt-16">
        <Home key="home" />
      </main>
    </div>
  );
}

export default App;
