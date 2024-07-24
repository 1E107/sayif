import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import TeamSideMenu from './TeamSideMenu';
import Drawer from '@mui/material/Drawer';

import '../../../styles/fonts.css';
import { useState } from 'react';

const pages = ['AI 새잎 클로버', '새잎 홈페이지'];
function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const [showSide, setShowSide] = useState(false);
    const [selectSideMenu, setSelectSideMenu] = useState('');

    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = event => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleAIClover = () => {
        navigate('/'); // 나중에 경로 수정
    };

    const handleGoMain = () => {
        navigate('/');
    };

    const handleShowSideMenu = () => {
        if (showSide) setShowSide(false);
        else setShowSide(true);
    };

    const handleShowPage = select => {
        // 사이드 메뉴에서 선택한 메뉴에 따라 어떤 컴포넌트 보여줄 지 선택
        switch (select) {
            case '홈':
                navigate('/team');
                break;
            case '우리 팀 보기':
                navigate('/team/team-member');
                break;
            case '멘토링 회의':
                navigate('/team/meeting');
                break;
            case '멘토링 자료':
                navigate('/team/document');
                break;
            case 'Q&A 게시판':
                navigate('/team/board');
                break;
            case '메시지':
                navigate('/team/message');
                break;
            case '퀴즈':
                navigate('/team/quiz');
                break;
            case '사연함':
                navigate('/team/story-board');
                break;
        }
    };

    return (
        <AppBar position="fixed" style={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'ChosunGu',
                            fontWeight: 'bold',
                            color: '#0B4619',
                            textDecoration: 'none',
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleShowSideMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div style={{ padding: '12px 12px 12px 0px' }}>
                            팀 오피스
                        </div>
                    </Typography>

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
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography
                                        textAlign="center"
                                        fontFamily="ChosunGu"
                                    >
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'ChosunGu',
                            fontWeight: 'bold',
                            color: '#0B4619',
                            textDecoration: 'none',
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div style={{ padding: '12px 12px 12px 0px' }}>
                            팀 오피스
                        </div>
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'flex-end',
                            marginRight: '30px',
                        }}
                    >
                        <Button
                            onClick={handleAIClover}
                            sx={{
                                my: 2,
                                display: 'block',
                                fontFamily: 'ChosunGu',
                                color: '#416D19',
                                fontWeight: '600',
                            }}
                        >
                            AI 새잎 클로버
                        </Button>
                        <Button
                            onClick={handleGoMain}
                            sx={{
                                my: 2,
                                display: 'block',
                                fontFamily: 'ChosunGu',
                                color: '#D1C285',
                                fontWeight: '600',
                            }}
                        >
                            새잎 홈페이지
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="마이페이지">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Drawer open={showSide}>
                        <TeamSideMenu
                            offSideMenu={handleShowSideMenu}
                            selectSideMenu={handleShowPage}
                        />
                    </Drawer>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
