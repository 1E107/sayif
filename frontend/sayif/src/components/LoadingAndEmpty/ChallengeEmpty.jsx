import styled from 'styled-components';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import '../../styles/fonts.css';

const Main = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Text = styled.div`
    font-family: ChosunGu;
    text-align: center;
    line-height: 150%;
`;

function Empty() {
    const EmptyView = (
        <Main>
            <Diversity3Icon
                style={{
                    fontSize: '150px',
                    color: '#116530',
                }}
            />
            <Text>
                아직{' '}
                <span style={{ color: '#BA9C03' }}>
                    미션을 수행한 팀원들이 없어요!
                </span>{' '}
                먼저 시작해보는 건 어떨까요? <br /> 같이 하면 더 재미있을 것
                같아요!
            </Text>
        </Main>
    );

    return EmptyView;
}

export default Empty;
