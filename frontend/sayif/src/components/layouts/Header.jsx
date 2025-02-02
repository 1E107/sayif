import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import '../../styles/fonts.css';
import { useSelector } from 'react-redux';
import { getTeamStatue } from '../../api/MentoringApi';
import NoTeamModal from '../Mentoring/NoTeamModal';
import Swal from 'sweetalert2';
import NoTeamModalMentor from '../Mentoring/NoTeamModalMentor'; // SweetAlert2 import 추가

function Header() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElSubLow, setAnchorElSubLow] = useState(null); // 줄어든 화면
    const [anchorElSubFull, setAnchorElSubFull] = useState(null); // 전체 화면
    const [currentSettings, setCurrentSettings] = useState([]);
    const [showNoTeamModal, setShowNoTeamModal] = useState(false);
    const [showNoTeamModalMentor, setShowNoTeamModalMentor] = useState(false);
    const { token, member } = useSelector(state => state.member);

    const pages = ['새잎 소개', '멘토링', '소통 공간', '정보 공간'];

    const settings = {
        '새잎 소개': ['서비스 소개', '커리큘럼 로드맵'],
        멘토링: [
            '멘토 프로필 조회',
            ...(member.role === 'Mentor' ? ['멘토링 그룹 생성'] : []),
            ...(member.role === 'Mentee' ? ['멘토링 신청'] : []),
        ],
        '소통 공간': ['자유 게시판'],
        '정보 공간': ['자립 지원 정보'],
    };
    const menuToPage = {
        '서비스 소개': '/serviceIntroduction',
        '커리큘럼 로드맵': '/curriculum',
        '멘토링 그룹 생성': '/create-mentoring',
        '멘토링 신청': '/apply-mentoring',
        '멘토 프로필 조회': '/mentor-profile',
        '자유 게시판': '/community',
        '자립 지원 정보': '/support-information',
    };

    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenSubMenuLow = (event, page) => {
        setAnchorElSubLow(event.currentTarget);
        setCurrentSettings(settings[page]);
        // 멘토링 메뉴의 경우 멘토, 멘티 볼 수 있는 하위 메뉴 다르게 하면 될 것 같음
        console.log(member);
        if (member === 'undefined') {
            console.log('로그인하세요');
        }
    };
    const handleOpenSubMenuFull = (event, page) => {
        if (page === '새잎 소개') {
            setAnchorElSubFull(event.currentTarget);
            setCurrentSettings(settings[page]);
        } else {
            if (!token) {
                alert('로그인 후 이용해 주세요');
                navigate('/member/login');
            } else {
                setAnchorElSubFull(event.currentTarget);
                setCurrentSettings(settings[page]);
            }
        }
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseSubMenuLow = subMenu => {
        setAnchorElSubLow(null);
        navigate(menuToPage[subMenu]);
    };

    const handleCloseSubMenuFull = subMenu => {
        setAnchorElSubFull(null);
        navigate(menuToPage[subMenu]);
    };

    const handleLoginPage = () => {
        navigate('/member/login');
    };

    const handleCloseNoTeamModal = () => {
        setShowNoTeamModal(false);
    };
    const handleCloseNoTeamModalMentor = () => {
        setShowNoTeamModalMentor(false);
    };

    const handleMyPage = () => {
        navigate('/my-page');
    };

    const handleTeamPage = () => {
        console.log(member);
        const callGetStatus = async () => {
            if (member.teamId) {
                try {
                    const response = await getTeamStatue(member.teamId, token);
                    console.log(response);
                    if (response.status === 200) {
                        if (response.data.status === 'Proceed') {
                            navigate('/team');
                        } else {
                            if (member.role === 'Mentor') {
                                setShowNoTeamModalMentor(true);
                            } else {
                                setShowNoTeamModal(true);
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                if (member.role === 'Mentor') {
                    setShowNoTeamModalMentor(true);
                } else {
                    setShowNoTeamModal(true);
                }
            }
        };
        callGetStatus();
    };

    return (
        <AppBar position="fixed">
            <Container
                style={{
                    backgroundColor: 'white',
                    margin: '0px',
                    width: '100%',
                    padding: '0px 30px 0px 3git0px',
                    maxWidth: 'none',
                }}
            >
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                            paddingRight: 7.9,
                        }}
                    >
                        <img src="/logo.png"></img>
                    </Typography>

                    {/* 화면 크기 줄이면 */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map(page => (
                                <MenuItem
                                    key={page}
                                    onClick={event => {
                                        handleOpenSubMenuLow(event, page);
                                    }}
                                >
                                    <Typography
                                        textAlign="center"
                                        fontFamily="ChosunGu"
                                    >
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                            <Menu
                                sx={{
                                    mt: '45px',
                                }}
                                id="menu-appbar"
                                anchorEl={anchorElSubLow}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElSubLow)}
                                onClose={handleCloseSubMenuLow}
                            >
                                {currentSettings.map(setting => (
                                    <MenuItem
                                        key={setting}
                                        onClick={() => {
                                            handleCloseSubMenuLow(setting);
                                        }}
                                    >
                                        <Typography
                                            fontFamily="ChosunGu"
                                            paddingLeft="5px"
                                            paddingRight="20px"
                                            marginTop="2px"
                                            minWidth="120px"
                                        >
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src="/logo.png"></img>
                    </Typography>

                    {/* 전체 화면 */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        {pages.map(page => (
                            <Button
                                key={page}
                                onClick={event => {
                                    handleOpenSubMenuFull(event, page);
                                }}
                                sx={{
                                    my: 2,
                                    color: 'black',
                                    display: 'block',
                                    fontFamily: 'ChosunGu',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                        <Menu
                            sx={{
                                mt: '45px',
                                '& .MuiPaper-root': {
                                    overflow: 'visible',
                                    boxShadow: 'none',
                                    minWidth: '170px',
                                    filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.32))',
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform:
                                            'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            anchorEl={anchorElSubFull}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElSubFull)}
                            onClose={handleCloseSubMenuFull}
                            id="menu-appbar"
                        >
                            {currentSettings.map(setting => (
                                <MenuItem
                                    key={setting}
                                    onClick={() => {
                                        handleCloseSubMenuFull(setting);
                                    }}
                                    sx={{ boxShadow: 'none' }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: 'ChosunGu',
                                            fontSize: '14px',
                                        }}
                                    >
                                        {' '}
                                        {setting}{' '}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {token ? (
                            <div style={{ display: 'flex' }}>
                                <Button
                                    onClick={handleTeamPage}
                                    sx={{
                                        my: 2,
                                        color: 'black',
                                        display: 'block',
                                        fontFamily: 'ChosunGu',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}
                                >
                                    팀 오피스
                                </Button>
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="마이페이지">
                                        <IconButton
                                            sx={{ p: 0, my: 2, mx: 1 }}
                                            onClick={handleMyPage}
                                        >
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={member.profileImg}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </div>
                        ) : (
                            <>
                                <Tooltip title="로그인">
                                    <IconButton
                                        sx={{ p: 0 }}
                                        onClick={handleLoginPage}
                                    >
                                        <PersonOutlineIcon
                                            sx={{
                                                display: {
                                                    xs: 'none',
                                                    md: 'flex',
                                                },
                                                mr: 1,
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
            {showNoTeamModal && (
                <NoTeamModal onClose={handleCloseNoTeamModal} />
            )}
            {showNoTeamModalMentor && (
                <NoTeamModalMentor onClose={handleCloseNoTeamModalMentor} />
            )}
        </AppBar>
    );
}

export default Header;
