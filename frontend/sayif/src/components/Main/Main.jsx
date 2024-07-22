import S from "./styled";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Main() {
    const MainView = (
        <>
            <S.MainTop>
                <S.MainTopTitle>청년이 청년에게, <br/> 함께하는 IT 멘토링</S.MainTopTitle>
                <S.MainText style={{marginTop: "30px"}}>바로 이 곳<br/>새잎에서</S.MainText>
                <ExpandMoreIcon style={{fontSize: "50px", margin: "50px"}}></ExpandMoreIcon>
                <S.MainText style={{color: "#0B4619", marginTop: "30px"}}>
                    쉽고 재미있는 IT 교육으로 새로운 가능성을 발견하세요. <br/>
                    청년 멘토와 같이 성장하고 꿈을 키워나가며, <br/>
                    자유롭게 소통하고 정보를 공유하세요. <br/>
                </S.MainText>
            </S.MainTop>
            <S.MainMiddle>

            </S.MainMiddle>
            <S.MainBottom>

            </S.MainBottom>
        </>
    )

    return MainView;
}

export default Main;