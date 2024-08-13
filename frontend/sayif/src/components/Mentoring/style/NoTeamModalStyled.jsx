import styled from 'styled-components';
import '../../../styles/fonts.css';

const titleText = styled.div`
    margin-top: 13px;
    font-family: ChosunGu;
    font-size: 20px;
    font-weight: bold;
`;

const contentText = styled.div`
    font-family: ChosunGu;
    margin-top: 40px;
    font-size: 14px;
    line-height: 150%;
`;

const highlight = styled.div`
    display: inline-block;
    background-color: #116530;
    padding: 2px 5px 2px 5px;
    color: white;
    border-radius: 5px;
    height: 5px;
    font-size: 13px;
`;

const S = {
    titleText,
    contentText,
    highlight,
};

export default S;
