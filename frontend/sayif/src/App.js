import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Header from './components/layouts/Header';
import IntroPage from './pages/Introduction/IntroPage';
import CommunityPage from './pages/Community/CommunityPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/introduction" element={<IntroPage></IntroPage>}></Route>
        <Route path="/community" element={<CommunityPage></CommunityPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
