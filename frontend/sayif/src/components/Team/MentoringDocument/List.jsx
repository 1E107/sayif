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
import S from './style/ListStyled';
import '../../../styles/fonts.css';
import { useNavigate } from 'react-router-dom';
import { getMaterialList } from '../../../api/TeamApi';
import { useSelector } from 'react-redux';
import ChatbotModal from '../ChatBotModal';

const columns = [
    { id: 'title', label: '제목', minWidth: 250, align: 'center' },
    { id: 'createdAt', label: '작성일', minWidth: 170, align: 'center' },
    { id: 'chapter', label: '단원', minWidth: 50, align: 'center' },
    // { id: 'hit', label: '조회수', minWidth: 50, align: 'center' },
];

function MaterialList() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [rows, SetRows] = useState([]);
    const [isChatBotModalOpen, setIsChatBotModalOpen] = useState(false);
    const { token, member } = useSelector(state => state.member);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const moveDetailPage = id => {
        navigate(`/team/material/detail/${id}`);
    };

    const handleChatBotButtonClick = () => {
        setIsChatBotModalOpen(true); // ChatBotModal을 염
    };

    const handleChatBotModalClose = () => {
        setIsChatBotModalOpen(false); // ChatBotModal을 닫음
    };

    useEffect(() => {
        const callMaterialList = async () => {
            try {
                const response = await getMaterialList(
                    member.teamId,
                    token,
                    page,
                    10,
                );
                if (response.status === 200) {
                    SetRows(response.data.content);
                }
            } catch (error) {
                console.log(error);
            }
        };

        callMaterialList();
    }, [page, rowsPerPage, member.teamId, token]);

    const ListView = (
        <S.Container>
            <div style={{ textAlign: 'center' }}>
                <S.Title>멘토링 자료 게시판</S.Title>
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
            </div>
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
                                            fontSize: '15px',
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
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#f0f0f0',
                                                },
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {columns.map(column => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            fontFamily:
                                                                'ChosunGu',
                                                            fontSize: '15px',
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
            <S.FloatingButton onClick={handleChatBotButtonClick} />
            <ChatbotModal
                open={isChatBotModalOpen}
                handleClose={handleChatBotModalClose}
            />
        </S.Container>
    );

    return ListView;
}

export default MaterialList;
