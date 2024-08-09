import S from './style/LetterStyled';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { getList } from '../../../api/Letter';
import { useSelector } from 'react-redux';
import LetterModal from './LetterModal';

function Letter() {
    const { token, member } = useSelector(state => state.member);
    const [totalData, SetTotalData] = useState(0);
    const [itemList, SetItemList] = useState([]);
    const itemsPerPage = 6;
    const [page, SetPage] = useState(1);
    const [showModal, SetShowModal] = useState(false);
    const [selectId, SetSelectId] = useState();

    useEffect(() => {
        const callGetList = async () => {
            try {
                const response = await getList(token, page, 6);
                if (response.status === 200) {
                    SetTotalData(response.data.totalElements);
                    SetItemList(response.data.content);
                }
            } catch (error) {
                console.log(error);
            }
        };

        callGetList();
    }, []);

    const handlePageChange = (event, value) => {
        SetPage(value);
    };

    const handleModal = () => {
        SetShowModal(!showModal);
    };

    const handleDetailPage = id => {
        SetSelectId(id);
        handleModal();
    };

    const LetterView = (
        <>
            <S.Container>
                <S.HeaderText>쪽지함</S.HeaderText>
                <S.ListWrapper>
                    {itemList.map(data => {
                        return (
                            <S.ListItem
                                onClick={() => {
                                    handleDetailPage(data.id);
                                }}
                            >
                                <S.ListText>{data.sendId}</S.ListText>
                                <S.ListText>{data.title}</S.ListText>
                                <S.ListText>{data.createdAt}</S.ListText>
                            </S.ListItem>
                        );
                    })}

                    <S.PageWrapper>
                        <Stack spacing={2}>
                            <Pagination
                                onChange={handlePageChange}
                                count={Math.ceil(totalData / itemsPerPage)}
                            />
                        </Stack>
                    </S.PageWrapper>
                </S.ListWrapper>
            </S.Container>
            {showModal && <LetterModal onClose={handleModal} id={selectId} />}
        </>
    );
    return LetterView;
}

export default Letter;
