import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Header from './components/layouts/Header';
import IntroPage from './pages/Introduction/IntroPage';
import CommunityPage from './pages/Community/CommunityPage';
import ApplyPage from './pages/Mentoring/ApplyPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/serviceIntroduction" element={<IntroPage></IntroPage>}></Route>
        <Route path="/community" element={<CommunityPage></CommunityPage>}></Route>
        <Route path="/apply-mentoring" element={<ApplyPage></ApplyPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
