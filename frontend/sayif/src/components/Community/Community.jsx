import S from './style/CommunityStyled';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import '../../styles/fonts.css';
import { useNavigate } from 'react-router-dom';
import { GetCommunityList } from '../../api/Main';
import { useSelector } from 'react-redux';

const columns = [
    { id: 'title', label: '제목', minWidth: 250, align: 'center' },
    { id: 'type', label: '카테고리', minWidth: 100, align: 'center' },
    { id: 'writer', label: '작성자', minWidth: 100, align: 'center' },
    { id: 'createdAt', label: '작성일', minWidth: 170, align: 'center' },
    { id: 'hitCount', label: '조회수', minWidth: 50, align: 'center' },
];

function Community() {
    const navigate = useNavigate();
    const [value, setValue] = useState('전체');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [rows, SetRows] = useState([]);
    const { token } = useSelector(state => state.member);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const moveDetailPage = id => {
        navigate(`/community/datail/${id}`);
    };

    useEffect(() => {
        const callCommunityList = async () => {
            try {
                const response = await GetCommunityList(token, value, page, 10);
                console.log(response);
                if(response.status === 200) {
                    SetRows(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        callCommunityList();
    }, [value]);

    const CommunityView = (
        <S.Container>
            <S.HeaderWrapper>
                <Box sx={{ width: '300px' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                        sx={{
                            '& .MuiTab-root': {
                                color: '#116530',
                                fontFamily: 'ChosunGu',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                '&.Mui-selected': {
                                    color: '#116530',
                                },
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#116530',
                                color: '#116530',
                            },
                        }}
                    >
                        <Tab label="전체" value={'Total'} />
                        <Tab label="일상" value={'Free'} />
                        <Tab label="고민" value={'Worry'} />
                    </Tabs>
                </Box>
                <div>
                    <S.CustomTextField
                        id="input-with-icon-textfield"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{ color: '#116530' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <S.SearchButton variant="contained">검색</S.SearchButton>
                    <S.WriteButton variant="outlined">글쓰기</S.WriteButton>
                </div>
            </S.HeaderWrapper>
            <Paper
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                    height: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '20px',
                }}
            >
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                        style={{ padding: '0px 30px 0px 30px' }}
                    >
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            fontFamily: 'ChosunGu',
                                            color: '#116530',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage,
                                )
                                .map(row => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.writingId}
                                            onClick={() =>
                                                moveDetailPage(row.id)
                                            }
                                        >
                                            {columns.map(column => {
                                                let value = row[column.id];
                                                if(column.id === 'type') {
                                                    if(value === 'Free') value = '일상';
                                                    else if(value === 'Worry') value = '고민'
                                                }
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            fontFamily:
                                                                'ChosunGu',
                                                        }}
                                                    >
                                                        {column.format &&
                                                        typeof value ===
                                                            'number'
                                                            ? column.format(
                                                                  value,
                                                              )
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[7, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{ color: '#116530', fontWeight: 'bold' }}
                />
            </Paper>
        </S.Container>
    );

    return CommunityView;
}

export default Community;
