import styled from "styled-components";
import Register from "../../components/Member/Register";
import ProofDocuments from "../../components/Member/ProofDocuments";
import '../../styles/fonts.css';
import { useLocation } from "react-router-dom";
const Main = styled.div`
    height: 700px;
`

const Item = styled.div`
    height: 650px;
    width: 650px;
    background-color: #116530;
    border-radius: 0px 0px 0px 1000px;
    display: flex;
    align-items : center;
    justify-content: flex-end;
`

const ItemText = styled.div`
    color: #E8E8CC;
    font-size: 65px;
    font-family: Freesentation-9Black;
    letter-spacing: 5px;
    margin-right: 50px;
`

const ItemGroup = styled.div`
    display: flex;
    justify-content: space-between;
`

const RegisterPage = () => {
    const location = useLocation();

    return (
        <Main>
            <ItemGroup>
                {location.pathname === '/member/regist' && <Register/>}
                {location.pathname === '/member/regist/proof-documents' && <ProofDocuments/>}
                <Item><ItemText>함께 해요</ItemText></Item>
            </ItemGroup>
        </Main>
    )
}

export default RegisterPage;