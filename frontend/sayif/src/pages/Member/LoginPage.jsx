import Login from "../../components/Member/Login";
import styled from "styled-components";
import '../../styles/fonts.css';

const Main = styled.div`
    height: 700px;
`;

const Item = styled.div`
    height: 650px;
    width: 650px;
    background-color: #116530;
    border-radius: 0px 0px 1000px 0px;
    display: flex;
    align-items : center;
`;

const ItemText = styled.div`
    color: #E8E8CC;
    font-size: 65px;
    font-family: Freesentation-9Black;
    letter-spacing: 5px;
    margin-left: 50px;
`

const ItemGroup = styled.div`
    display: flex;
    justify-content: space-between;
`

const LoginPage = () => {
    return (
       <Main>
        <ItemGroup>
            <Item><ItemText>환영해요</ItemText></Item>
            <Login></Login>
        </ItemGroup>
       </Main>
    )
}

export default LoginPage;