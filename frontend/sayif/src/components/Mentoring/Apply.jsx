import S from "./style/ApplyStyled";
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import '../../styles/fonts.css'
import { useState } from "react";
import DateTime from "./Step/DateTime";
import SelectMentor from "./Step/SelectMentor";

function Apply() {
    const [showApplyMain, setShowApplyMain] = useState(true);
    const [showApplyDetail, setShowApplyDetail] = useState(false);
    const [showSelectMentor, setShowSelectMentor] = useState(false);
    const [showFinish, setShowFinish] = useState(false);

    // StartApply 컴포넌트에서 서버에서 멘토 리스트 요청 -> 받아온 데이터를 부모 컴포넌트 Apply로 넘겨줌
    // Apply 컴포넌트에서는 다시 selectMentor 컴포넌트로 데이터 넘겨줌
    const [formData, setFormData] = useState({
        TextAMPM: "",
        startDate: "",
        endDate: "",
        time: "",
        mentorList: [] 
    });

    const handleSelectInfo = (newData) => {
        // 멘토 리스트 등록 후 다른 컴포넌트 출력을 위해 setShowApplyDetail은 다시 false
        setFormData((prevData) => ({
            ...prevData,
            ...newData
        }));
        setShowApplyDetail(false);
        setShowSelectMentor(true);
        console.log(newData);
    }

    const handleReSelect = () => {
        setShowSelectMentor(false);
        setShowApplyDetail(true);
    }

    const handleFinishPage = () => {
        setShowSelectMentor(false);
        setShowFinish(true);
    }

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
                showApplyDetail && <DateTime selectInfoSave={handleSelectInfo}></DateTime>
            }
             {
                showSelectMentor && <SelectMentor formData={formData} reSelectInfo={handleReSelect} finishPage={handleFinishPage}></SelectMentor>
            }
           </S.Container>
        </>
    )

    return ApplyView;
}

export default Apply;