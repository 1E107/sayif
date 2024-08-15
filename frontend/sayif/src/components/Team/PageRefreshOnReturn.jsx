// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const PageRefreshOnReturn = () => {
//     const location = useLocation();

//     useEffect(() => {
//         const currentPath = location.pathname;
//         const hash = location.hash;

//         // 저장된 리프레시 상태 확인
//         const refreshKey = 'needsRefresh';
//         const needsRefresh = localStorage.getItem(refreshKey);

//         // 새로고침이 필요한 경우
//         if (currentPath === '/team/message' && !hash) {
//             if (needsRefresh) {
//                 localStorage.removeItem(refreshKey); // 새로고침 후 키 제거
//                 window.location.reload(); // 페이지 새로 고침
//             } else {
//                 localStorage.setItem(refreshKey, 'true'); // 새로고침 필요 상태 저장
//             }
//         } else {
//             // URL이 변경되면 키 제거
//             localStorage.removeItem(refreshKey);
//         }
//     }, [location]);

//     return null;
// };

// export default PageRefreshOnReturn;
