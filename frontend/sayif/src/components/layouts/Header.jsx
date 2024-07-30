import * as React from 'react';
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
import {useNavigate} from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import '../../styles/fonts.css'
import { useSelector } from 'react-redux';
import { getMemberInfo } from '../../api/MemberApi';
import { useState } from 'react';
import NoTeamModal from '../Mentoring/NoTeamModal';

const pages = ['새잎 소개', '멘토링', '소통 공간', '정보 공간'];
const settings = {
  '새잎 소개' :  ['서비스 소개', '커리큘럼 로드맵', '공지사항'],
  '멘토링' :  ['멘토링 그룹 생성', '멘토링 신청', '멘토 프로필 조회', '멘토링 자료 공유'],
  '소통 공간' :  ['자유 게시판'],
  '정보 공간' :  ['자립 지원 정보']
};
const menuToPage = {
  '서비스 소개' : '/serviceIntroduction',
  '커리큘럼 로드맵' : '/',
  '공지사항' : '/',
  '멘토링 그룹 생성' : '/',
  '멘토링 신청' : '/apply-mentoring',
  '멘토 프로필 조회' : '/',
  '멘토링 자료 공유' : '/',
  '자유 게시판' : '/community',
  '자립 지원 정보' : '/info'
} 

function Header() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElSubLow, setAnchorElSubLow] = useState(null); // 줄어든 화면
  const [anchorElSubFull, setAnchorElSubFull] = useState(null); // 전체 화면
  const [currentSettings, setCurrentSettings] = useState([]);
  const [showNoTeamModal, setShowNoTeamModal] = useState(false);
  const { token, member } = useSelector(state => state.member);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenSubMenuLow = (event, page) => {
    setAnchorElSubLow(event.currentTarget);
    setCurrentSettings(settings[page]);
    // 멘토링 메뉴의 경우 멘토, 멘티 볼 수 있는 하위 메뉴 다르게 하면 될 것 같음
  };
  const handleOpenSubMenuFull = (event, page) => {
    setAnchorElSubFull(event.currentTarget);
    setCurrentSettings(settings[page]);
    // 멘토링 메뉴의 경우 멘토, 멘티 볼 수 있는 하위 메뉴 다르게 하면 될 것 같음
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseSubMenuLow = (subMenu) => {
    setAnchorElSubLow(null);
    navigate(menuToPage[subMenu]);
  };

  const handleCloseSubMenuFull = (subMenu) => {
    setAnchorElSubFull(null);
    navigate(menuToPage[subMenu]);
  };

  const handleLoginPage = () => {
    navigate("/member/login");
  }

  const handleCloseNoTeamModal = () => {
    setShowNoTeamModal(false);
  }

  const handleTeamPage = () => {
    const callGetStatus = async () => {
      try {
        const response = await getMemberInfo(member.team_id, token);
        if(response.data === 'Proceed') {
          navigate("/team");
        }
        else {
          setShowNoTeamModal(true);
        }
      }catch(error) {
        console.log(error);
      }
    };
    //callGetStatus();
    navigate("/team")
  }

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl" style={{backgroundColor: 'white'}}>
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
            }}
          >
            <img src="/logo.png"></img>
          </Typography>

          {/* 화면 크기 줄이면 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={(event) => {handleOpenSubMenuLow(event, page)}}>
                  <Typography textAlign="center" fontFamily="ChosunGu">{page}</Typography>
                </MenuItem>
              ))}
              <Menu
                sx={{ 
                  mt: '45px'
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
                {currentSettings.map((setting) => (
                  <MenuItem key={setting} onClick={() => {handleCloseSubMenuLow(setting)}}>
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
            <img src="logo.png"></img>
          </Typography>

          {/* 전체 화면 */}
          <Box sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', md: 'flex' }, 
              justifyContent: 'center', 
              alignItems: 'center'
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(event) => { handleOpenSubMenuFull(event, page) }}
                sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'ChosunGu', fontWeight: 'bold'}}
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
                    transform: 'translateY(-50%) rotate(45deg)',
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
              {currentSettings.map((setting) => (
                <MenuItem key={setting} onClick={() => { handleCloseSubMenuFull(setting) }} sx={{boxShadow:'none'}}>
                  <Typography sx={{fontFamily: 'ChosunGu', fontSize: '14px'}}> {setting} </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {token ? (
              <div style={{display: "flex"}}>
               <Button
                onClick={handleTeamPage}
                sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'ChosunGu', fontWeight: 'bold'}}
              >
                팀 오피스
              </Button>
              <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="마이페이지">
                  <IconButton
                      sx={{ p: 0, my: 2, mx: 1 }}
                  >
                      <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/2.jpg"
                      />
                  </IconButton>
              </Tooltip>
          </Box>
              </div>
             
            ) : (
              <Tooltip title="로그인">
              <IconButton sx={{ p: 0 }} onClick={handleLoginPage}>
                <PersonOutlineIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              </IconButton>
            </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
      {showNoTeamModal && <NoTeamModal onClose={handleCloseNoTeamModal}/>}
    </AppBar>
  );
}
export default Header;
