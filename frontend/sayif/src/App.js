import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Header from './components/layouts/Header';
import IntroPage from './pages/Introduction/IntroPage';
import CommunityPage from './pages/Community/CommunityPage';
import ApplyPage from './pages/Mentoring/ApplyPage';
import Profile from './pages/Mentoring/Profile';
import TeamPage from './pages/Team/TeamPage';
import TeamHeader from './components/Team/layouts/TeamHeader';
import BoardPage from './pages/Team/BoardPage';
import LoginPage from './pages/Member/LoginPage';
import CreatePage from './pages/Mentoring/CreatePage';
import RegisterPage from './pages/Member/RegisterPage';
import InformationPage from './pages/Information/InformationPage';
import InformationDetailPage from './pages/Information/InformationDetailPage';
import MyPage from './pages/Member/MyPage';
import MaterialPage from './pages/Team/MaterialPage';
import CommunityDetailPage from './pages/Community/ComunityDetailPage';
import ChallengeDetailPage from './pages/Team/ChallengeDetailPage';
import './App.css';
import useTokenExpiration from './hooks/useTokenExpiration';
import CommunityWritePage from './pages/Community/CommunityWritePage';
import LetterPage from './pages/Member/LetterPage';
import BoardWritePage from './pages/Team/BoardWritePage';

function App() {
    useTokenExpiration();
    const location = useLocation();

    return (
        <>
            {location.pathname.startsWith('/team') ? (
                <TeamHeader></TeamHeader>
            ) : (
                <Header></Header>
            )}
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/serviceIntroduction" element={<IntroPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route
                    path="/community/detail/:id"
                    element={<CommunityDetailPage />}
                />
                <Route
                    path="/community/write"
                    element={<CommunityWritePage />}
                />
                <Route path="/apply-mentoring" element={<ApplyPage />} />
                <Route path="/mentor-profile" element={<Profile />} />
                <Route path="/team/*" element={<TeamPage />} />
                <Route path="/team/board/write" element={<BoardWritePage />} />
                <Route path="/team/board/detail/:id" element={<BoardPage />} />
                <Route
                    path="/team/material/detail/:id"
                    element={<MaterialPage />}
                />
                <Route path="/member">
                    <Route path="login" element={<LoginPage />} />
                    <Route path="regist/*" element={<RegisterPage />} />
                </Route>
                <Route path="/create-mentoring" element={<CreatePage />} />
                <Route
                    path="/support-information"
                    element={<InformationPage />}
                />
                <Route
                    path="/support-information/:id"
                    element={<InformationDetailPage />}
                />
                <Route path="/my-page" element={<MyPage />} />
                <Route
                    path="/team/challenge/photo/:id/:challengeId"
                    element={<ChallengeDetailPage />}
                />
                <Route path="/letter" element={<LetterPage />} />
            </Routes>
        </>
    );
}

const AppMain = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

export default AppMain;
