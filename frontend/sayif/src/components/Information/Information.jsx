import S from './style/InformationStyled';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSupportInfo } from '../../api/Main';
import { useSelector } from 'react-redux';

function Information() {
    const navigate = useNavigate();
    const { token, member } = useSelector(state => state.member);
    const [infoList, SetInfoList] = useState([]);
    const [rows, SetRows] = useState([]);
    const [page, SetPage] = useState(1);
    const [totalCount, SetTotalCount] = useState(6);
    const itemsPerPage = 6;

    const handleShowDetail = id => {
        navigate(`/support-information/${id}`);
    };

    const callGetInfo = async () => {
        try {
            const response = await getSupportInfo(page - 1, 6, token);
            if (response.status === 200) {
                SetInfoList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        callGetInfo();
    }, [page]);

    useEffect(() => {
        const gridDisplay = () => {
            const newRows = [];
            for (let i = 0; i < infoList.length; i += 4) {
                newRows.push(infoList.slice(i, i + 4));
            }
            SetRows(newRows);
        };
        gridDisplay();
    }, [infoList]);

    const formatDateTime = dateTime => {
        const [date, time] = dateTime.split(' ');
        return { date, time };
    };

    const handlePageChange = (event, value) => {
        SetPage(value);
    };

    const InformationView = (
        <S.Container>
            <S.Title>자립 지원 정보</S.Title>
            <div>
                <S.Line />
            </div>
            {rows.length === 0 ? (
                <></>
            ) : (
                rows.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        style={{ display: 'flex', marginBottom: '30px' }}
                    >
                        {' '}
                        {row.map((col, colIndex) => {
                            const { date: startDate, time: startTime } =
                                formatDateTime(col.recruitStart);
                            const { date: endDate, time: endTime } =
                                formatDateTime(col.recruitEnd);
                            return (
                                <Card
                                    key={colIndex}
                                    sx={{ maxWidth: 300, borderRadius: 7 }}
                                    style={{ marginLeft: '30px' }}
                                    onClick={() => {
                                        handleShowDetail(col.id);
                                    }}
                                >
                                    <CardMedia
                                        sx={{ height: 200 }}
                                        image="/img/info-temp-img.jpg"
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <S.InfoTitle
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            {col.title}
                                        </S.InfoTitle>
                                        <S.InfoContent
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {startDate} ~ {endDate}
                                        </S.InfoContent>
                                        <S.InfoContent
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {col.region}
                                        </S.InfoContent>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ))
            )}

            <Stack spacing={2} style={{ margin: '50px 0px 50px 0px' }}>
                <Pagination
                    count={Math.ceil(totalCount / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            bgcolor: 'white',
                            color: '#116530',
                            '&.Mui-selected': {
                                bgcolor: '#116530',
                                color: 'white',
                            },
                        },
                    }}
                />
            </Stack>
        </S.Container>
    );

    return InformationView;
}

export default Information;
