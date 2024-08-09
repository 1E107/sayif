import styled from 'styled-components';
import '../../../styles/fonts.css';

const Container = styled.div`
    margin-top: 80px;
    width: 800px;
    height: 600px;
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.16),
        0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 30px;
`;

const HeaderText = styled.div`
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 10px;
    font-family: ChosunGu;
    background-color: #116530;
    width: 720px;
    color: white;
    padding: 10px 10px 10px 30px;
    border-radius: 30px;
    font-size: 20px;
`;

const ListWrapper = styled.div`
    margin: 30px;
    height: 500px;
    display: flex;
    flex-direction: column;
`;

const PageWrapper = styled.div`
    margin-top: auto;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
`;

const ListItem = styled.div`
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #dee2e6;
    margin-bottom: 20px;
    cursor: pointer;
`;

const ListText = styled.div`
    margin: 0px 20px 0px 20px;
    font-family: ChosunGu;
`;

const S = {
    Container,
    HeaderText,
    ListWrapper,
    ListItem,
    ListText,
    PageWrapper,
};

export default S;
