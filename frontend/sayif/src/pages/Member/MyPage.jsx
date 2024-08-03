import MyPageComponent from '../../components/Member/MyPage'
import styled from 'styled-components';

const Main = styled.div`
    height: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MyPage = () => {
    return(
        <Main>
            <MyPageComponent/>
        </Main>
    )   
}

export default MyPage;