import S from './style/LetterStyled';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { getList } from '../../api/Letter';
import { useSelector } from 'react-redux';

function Letter() {
    const { token, member } = useSelector(state => state.member);
    const [totalData, SetTotalData] = useState(0);
    const [itemList, SetItemList] = useState([]);
    const itemsPerPage = 6;

    useEffect(() => {
        const callGetList = async () => {
            try {
                const response = await getList(token, 1, 6);
                if (response.status === 200) {
                    SetTotalData(response.data.totalElements);
                    SetItemList(response.data.content);
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        callGetList();
    }, []);

    const LetterView = (
        <S.Container>
            <S.HeaderText>쪽지함</S.HeaderText>
            <S.ListWrapper>
                {itemList.map(data => {
                    return (
                        <S.ListItem>
                            <S.ListText>{data.sendId}</S.ListText>
                            <S.ListText>{data.title}</S.ListText>
                            <S.ListText>{data.createdAt}</S.ListText>
                        </S.ListItem>
                    );
                })}

                <S.PageWrapper>
                    <Stack spacing={2}>
                        <Pagination
                            count={Math.ceil(totalData / itemsPerPage)}
                        />
                    </Stack>
                </S.PageWrapper>
            </S.ListWrapper>
        </S.Container>
    );
    return LetterView;
}

export default Letter;
