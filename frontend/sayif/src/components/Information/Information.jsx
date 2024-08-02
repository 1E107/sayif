import S from './InformationStyled'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Information() {
    const navigate = useNavigate();

    const handleShowDetail = (id) => {
        navigate(`/support-information/${id}`)
    }

    useEffect(() => {
        
    }, []);

    const InformationView = (
        <S.Container>
            <S.Title>자립 지원 정보</S.Title>
            <div>
                <S.Line/>
            </div>
            <div style={{display: "flex", marginBottom: "30px"}}>
                <Card sx={{ maxWidth: 300, borderRadius: 7}} style={{marginLeft: "30px"}} onClick={() => {handleShowDetail(1)}}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image="/img/info-temp-img.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <S.InfoTitle gutterBottom variant="h5" component="div">
                        자립준비청년 자조모임 지원 사업
                        </S.InfoTitle>
                        <S.InfoContent variant="body2" color="text.secondary">2024.04.19 ~ 2024.05.31</S.InfoContent>
                        <S.InfoContent variant="body2" color="text.secondary">경상남도 자립지원전담기관</S.InfoContent>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 300, borderRadius: 7 }} style={{marginLeft: "30px"}}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image="/img/info-temp-img.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <S.InfoTitle gutterBottom variant="h5" component="div">
                        자립준비청년 자조모임 지원 사업
                        </S.InfoTitle>
                        <S.InfoContent variant="body2" color="text.secondary">2024.04.19 ~ 2024.05.31</S.InfoContent>
                        <S.InfoContent variant="body2" color="text.secondary">경상남도 자립지원전담기관</S.InfoContent>
                    </CardContent>
                </Card>
            </div>
            <div style={{display: "flex", marginBottom: "30px"}}>
                <Card sx={{ maxWidth: 300, borderRadius: 7}} style={{marginLeft: "30px"}}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image="/img/info-temp-img.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <S.InfoTitle gutterBottom variant="h5" component="div">
                        자립준비청년 자조모임 지원 사업
                        </S.InfoTitle>
                        <S.InfoContent variant="body2" color="text.secondary">2024.04.19 ~ 2024.05.31</S.InfoContent>
                        <S.InfoContent variant="body2" color="text.secondary">경상남도 자립지원전담기관</S.InfoContent>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 300, borderRadius: 7 }} style={{marginLeft: "30px"}}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image="/img/info-temp-img.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <S.InfoTitle gutterBottom variant="h5" component="div">
                        자립준비청년 자조모임 지원 사업
                        </S.InfoTitle>
                        <S.InfoContent variant="body2" color="text.secondary">2024.04.19 ~ 2024.05.31</S.InfoContent>
                        <S.InfoContent variant="body2" color="text.secondary">경상남도 자립지원전담기관</S.InfoContent>
                    </CardContent>
                </Card>
            </div>
            <Stack spacing={2} style={{margin:"50px 0px 50px 0px"}}>
                <Pagination count={10} variant="outlined" sx={{
                    '& .MuiPaginationItem-root': {
                        bgcolor: 'white',
                        color: '#116530', 
                        '&.Mui-selected': {
                            bgcolor: '#116530', 
                            color: 'white',
                        },
                    },
                }}/>
            </Stack>
        </S.Container>
    )

    return InformationView;
}

export default Information;