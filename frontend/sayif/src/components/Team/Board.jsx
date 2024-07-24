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
import { useState } from 'react';
import S from './style/BoardStyled';
import '../../styles/fonts.css';

const columns = [
    { id: 'title', label: '제목', minWidth: 250, align: 'center' },
    { id: 'writer', label: '작성자', minWidth: 100, align: 'center' },
    { id: 'writeDate', label: '작성일', minWidth: 170, align: 'center' },
    { id: 'comment', label: '댓글', minWidth: 50, align: 'center' },
    { id: 'read', label: '조회수', minWidth: 50, align: 'center' },
];

const rows = [
    {
        title: 'React의 기초',
        writer: '홍길동',
        writeDate: '2024-07-01',
        comment: 12,
        read: 150,
    },
    {
        title: '자바스크립트 심화',
        writer: '이몽룡',
        writeDate: '2024-07-05',
        comment: 5,
        read: 200,
    },
    {
        title: 'CSS Flexbox 이해하기',
        writer: '성춘향',
        writeDate: '2024-07-10',
        comment: 8,
        read: 120,
    },
    {
        title: 'Node.js 시작하기',
        writer: '김철수',
        writeDate: '2024-07-15',
        comment: 3,
        read: 90,
    },
    {
        title: '프론트엔드와 백엔드의 차이',
        writer: '박영희',
        writeDate: '2024-07-20',
        comment: 15,
        read: 300,
    },
    {
        title: 'API와 데이터 통신',
        writer: '최민수',
        writeDate: '2024-07-22',
        comment: 7,
        read: 180,
    },
    {
        title: '웹 접근성의 중요성',
        writer: '이순신',
        writeDate: '2024-07-25',
        comment: 0,
        read: 60,
    },
    {
        title: '리액트 라우터 사용법',
        writer: '강감찬',
        writeDate: '2024-07-27',
        comment: 10,
        read: 220,
    },
    {
        title: '모바일 웹 최적화',
        writer: '유관순',
        writeDate: '2024-07-30',
        comment: 4,
        read: 110,
    },
    {
        title: '서버 사이드 렌더링',
        writer: '장보고',
        writeDate: '2024-08-01',
        comment: 6,
        read: 130,
    },
];

function Board() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const BoardView = (
        <S.Container>
            <div style={{ textAlign: 'center' }}>
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
                                            key={row.code}
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
            <S.CustomButton variant="contained">글쓰기</S.CustomButton>
        </S.Container>
    );

    return BoardView;
}

export default Board;
