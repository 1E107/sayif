import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './components/Main/Main';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
