import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpirationdate, setMember, setToken } from "../redux/modules/member";
import { useLocation, useNavigate } from "react-router-dom";

const useTokenExpiration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {expirationDate} = useSelector(state => state.member);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const location = useLocation();

    const logout = () => {
        if(!isLoggedOut) {
            localStorage.removeItem('persist:root');
            dispatch(setToken(null));
            dispatch(setMember({}));
            dispatch(setExpirationdate(null));
            setIsLoggedOut(true);
            alert("로그아웃 되었습니다. 다시 로그인하세요!");
            navigate('/member/login');
        }
    }

    useEffect(() => {
        const expirationDateUtc = new Date(expirationDate);
        const currentDate = new Date();
    
        const checkTokenExpiration = () => {
            if (expirationDateUtc <= currentDate) {
                logout();
            }
        };

        checkTokenExpiration();
        
        const interval = setInterval(() => {
            checkTokenExpiration();
        }, 60000);

        return () => clearInterval(interval);
    }, [dispatch, location.pathname]);
}

export default useTokenExpiration;