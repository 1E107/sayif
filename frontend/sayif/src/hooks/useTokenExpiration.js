import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setExpirationdate,
    setMember,
    setToken,
} from '../redux/modules/member';
import { useLocation, useNavigate } from 'react-router-dom';
import { getNewToken, logout } from '../api/MemberApi';
import Swal from 'sweetalert2';

const useTokenExpiration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, member } = useSelector(state => state.member);
    const { expirationDate } = useSelector(state => state.member);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const location = useLocation();

    const handleLogout = async () => {
        try {
            if (!isLoggedOut) {
                const response = await logout(token);
                if (response.status === 200) {
                    localStorage.removeItem('persist:root');
                    dispatch(setToken(null));
                    dispatch(setMember({}));
                    dispatch(setExpirationdate(null));
                    setIsLoggedOut(true);
                    Swal.fire({
                        icon: 'warning',
                        title: '로그아웃 되었습니다. 다시 로그인하세요!',
                        showConfirmButton: false,
                        confirmButtonColor: '#6c8e23',
                        timer: 1500,
                    });
                    navigate('/member/login');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const expirationDateUtc = new Date(expirationDate);
        const currentDate = new Date();

        const checkTokenExpiration = () => {
            if (expirationDateUtc <= currentDate) {
                console.log('access token 재발급 요청');
                //토큰 재발급
                const callNewToken = async () => {
                    try {
                        const response = await getNewToken();
                        const authToken = response.headers['access'];
                        dispatch(setToken(authToken));
                    } catch (error) {
                        console.log(error);
                        handleLogout();
                    }
                };

                callNewToken();
            }
        };

        checkTokenExpiration();

        const interval = setInterval(() => {
            checkTokenExpiration();
        }, 60000);

        return () => clearInterval(interval);
    }, [dispatch, location.pathname]);
};

export default useTokenExpiration;
