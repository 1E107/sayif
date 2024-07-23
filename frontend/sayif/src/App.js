import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Header from "./components/layouts/Header";
import IntroPage from "./pages/Introduction/IntroPage";
import CommunityPage from "./pages/Community/CommunityPage";
import ApplyPage from "./pages/Mentoring/ApplyPage";
import TeamPage from "./pages/Team/TeamPage";
import TeamHeader from "./components/Team/layouts/TeamHeader";

import "./App.css";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith("/team") ? (
        <TeamHeader></TeamHeader>
      ) : (
        <Header></Header>
      )}
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route
          path="/serviceIntroduction"
          element={<IntroPage></IntroPage>}
        ></Route>
        <Route
          path="/community"
          element={<CommunityPage></CommunityPage>}
        ></Route>
        <Route
          path="/apply-mentoring"
          element={<ApplyPage></ApplyPage>}
        ></Route>
        <Route path="/team" element={<TeamPage></TeamPage>}></Route>
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
