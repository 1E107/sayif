import S from "./style/styled";
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import '../../styles/fonts.css'
import { useState } from "react";
import StartApply from "./StartApply";

function Apply() {
    const [showApplyMain, setShowApplyMain] = useState(true);
    const [showApplyDetail, setShowApplyDetail] = useState(false);

    const clickApplyBtn = () => {
        setShowApplyMain(false);
        setShowApplyDetail(true);
    }

    const ApplyView = (
        <>
           <S.Title>멘토링 신청</S.Title>
           <S.ExplainText>희망 날짜와 시간에 가능한 멘토를 선택해 멘토링을 신청하세요.</S.ExplainText>
           <S.Container>
            {showApplyMain && 
            <>
                <S.ApplyIconContainer>
                        <S.ApplyIconStep1>
                            <S.ApplyIconText>희망 시작일자 선택</S.ApplyIconText>
                        </S.ApplyIconStep1>
                        <S.ApplyIconStep1>
                            <S.ApplyIconText>희망 시간 선택</S.ApplyIconText>
                        </S.ApplyIconStep1>
                        <S.ApplyIconStep1>
                            <S.ApplyIconText>멘토 선택</S.ApplyIconText>
                        </S.ApplyIconStep1>
                        <S.ApplyIconStep1>
                            <S.ApplyIconText>멘토링 진행</S.ApplyIconText>
                        </S.ApplyIconStep1>
                </S.ApplyIconContainer>
                    <Button 
                        variant="contained"
                        endIcon={<ArrowRightAltIcon />}
                        onClick={clickApplyBtn}
                        style={{
                            fontFamily: "ChosunGu",
                            backgroundColor: "#116530",
                            width: "250px",
                            height: "50px",
                        }}
                        
                        >
                        멘토링 신청하러 가기
                    </Button>
            </>
            }
            {
                showApplyDetail && <StartApply></StartApply>
            }
           </S.Container>
           
        </>
    )

    return ApplyView;
}

export default Apply;