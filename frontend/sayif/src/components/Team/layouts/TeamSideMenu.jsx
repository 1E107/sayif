import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import VideocamIcon from '@mui/icons-material/Videocam';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import QuizIcon from '@mui/icons-material/Quiz';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import '../../../styles/fonts.css'
import { ListItemIcon, Typography } from '@mui/material';

const icon = {
    "홈" : <HomeIcon/>,
    "우리 팀 보기" : <PersonIcon/>,
    "멘토링 회의" : <VideocamIcon/>,
    "멘토링 자료" : <AttachFileIcon/>,
    "Q&A 게시판" : <ContactSupportIcon/>,
    "메시지" : <QuestionAnswerIcon/>,
    "퀴즈" : <QuizIcon/>,
    "사연함" : <NoteAltIcon/>
}

function TeamSideMenu({offSideMenu, selectSideMenu}) {
    const handleShowPage = (select) => {
        selectSideMenu(select);
    }

    const SideMenuView = (
        <Box sx={{ width: 250 }} role="presentation" onClick={offSideMenu}>
        <div style={{textAlign: "center", margin: "30px"}}>
            <img 
                src="/logo-green.png"
                width="70px"
            />
        </div>
        <List>
            {['홈', '우리 팀 보기', '멘토링 회의', '멘토링 자료', 'Q&A 게시판', '메시지', '퀴즈', '사연함'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => {handleShowPage(text)}}>
                    <ListItemIcon sx={{marginLeft: "10px"}}>{icon[text]}</ListItemIcon>
                    <ListItemText primary={<Typography sx={{fontFamily:"ChosunGu"}}>{text}</Typography>} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        </Box>
    );

    return SideMenuView;
}

export default TeamSideMenu;